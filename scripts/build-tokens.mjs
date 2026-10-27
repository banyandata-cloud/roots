#!/usr/bin/env node
/* Regenerates src/components/v2/styles/tokens/*.scss (the v2 package's own tokens) from the Figma exports in design-system/. v1 keeps its own committed copy in src/styles/tokens. */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokensDir = join(rootDir, 'design-system')
const outDir = join(rootDir, 'src/components/v2/styles/tokens')
const BANNER =
  '// GENERATED FILE — do not edit by hand.\n// Run `bun run tokens:build` to regenerate from design-system/.\n\n'

function readJson(file) {
  return JSON.parse(readFileSync(join(tokensDir, file), 'utf8'))
}

function toKebabCase(value) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .toLowerCase()
}

function toCssColor({ hex, alpha = 1, components, colorSpace }) {
  if (colorSpace !== 'srgb') {
    throw new Error(`Unsupported color space: ${colorSpace}`)
  }
  if (alpha === 1) {
    return hex
  }
  const [r, g, b] = components.map((component) => Math.round(component * 255))
  return `rgba(${r}, ${g}, ${b}, ${Number(alpha.toFixed(3))})`
}

function flattenColorTokens(node, prefix = []) {
  const entries = []
  for (const [key, token] of Object.entries(node)) {
    if (key.startsWith('$')) {
      continue
    }
    const path = [...prefix, key]
    if (token?.$type === 'color') {
      entries.push([toKebabCase(path.join('-')), toCssColor(token.$value)])
    } else if (token && typeof token === 'object') {
      entries.push(...flattenColorTokens(token, path))
    }
  }
  return entries
}

function colorMap(file, skipCollection = false) {
  const data = readJson(file)
  // Semantic leaves already include Text-/border-/Bg-/fg-/utility- prefixes.
  // Primitive colors retain their collection names to avoid scale collisions.
  const entries = skipCollection
    ? Object.entries(data)
        .filter(([key]) => !key.startsWith('$'))
        .flatMap(([, node]) => flattenColorTokens(node))
    : flattenColorTokens(data)
  const map = new Map()
  for (const [name, color] of entries) {
    if (map.has(name)) {
      throw new Error(`Duplicate normalized color token "${name}" in ${file}`)
    }
    map.set(name, color)
  }
  return map
}

function numberEntries(tokens) {
  return Object.entries(tokens)
    .filter(([key]) => !key.startsWith('$'))
    .map(([key, token]) => {
      if (token.$type !== 'number' || !Number.isFinite(token.$value)) {
        throw new Error(`Expected a finite numeric value for "${key}"`)
      }
      return [toKebabCase(key), token.$value]
    })
}

// Single place that decides which unit each token family is emitted in.
// The Figma exports are unitless pixel numbers; rem is derived from the browser
// default root font size (100% = 16px) so tokens follow the user's font-size setting.
const ROOT_FONT_SIZE_PX = 16

// Tokens that stay in px on purpose (hairlines). Radii are always px.
const PX_SPACING_TOKENS = new Set(['spacing-1'])

const toPx = (value) => `${value}px`

function toRem(value) {
  return `${Number((value / ROOT_FONT_SIZE_PX).toFixed(4))}rem`
}

const spacingUnit = (key, value) => (PX_SPACING_TOKENS.has(key) ? toPx(value) : toRem(value))

function dimensionScss(name, entries, format) {
  let scss = `${BANNER}$${name}: (\n`
  for (const [key, value] of entries) {
    scss += `  '${key}': ${format(key, value)},\n`
  }
  scss += ');\n\n'
  for (const [key, value] of entries) {
    scss += `$${key}: ${format(key, value)};\n`
  }
  return scss
}

const lightMap = colorMap('colors/light.tokens.json', true)
const darkMap = colorMap('colors/dark.tokens.json', true)
const baseMap = colorMap('base-colors.json')
for (const name of new Set([...lightMap.keys(), ...darkMap.keys()])) {
  if (!lightMap.has(name) || !darkMap.has(name)) {
    throw new Error(`Color token "${name}" must exist in both light and dark themes`)
  }
}

// CSS-emitting theme rules stay separate from the CSS-free Sass barrel.
let rootColorsScss = `${BANNER}// Include once in the application's global stylesheet.\n`
rootColorsScss += "// Switch themes with document.documentElement.dataset.theme = 'dark'.\n"
for (const { selector, colors } of [
  { selector: ':root', colors: lightMap },
  { selector: "[data-theme='dark']", colors: darkMap },
]) {
  rootColorsScss += `${selector} {\n`
  for (const [name, color] of colors) {
    rootColorsScss += `  --color-${name}: ${color};\n`
  }
  rootColorsScss += '}\n\n'
}

let colorsScss = `${BANNER}// Runtime theme-aware aliases; emits no CSS.\n`
for (const name of lightMap.keys()) {
  colorsScss += `$color-${name}: var(--color-${name});\n`
}

let baseColorsScss = `${BANNER}// Static primitive palette; not theme-aware.\n`
for (const [name, color] of baseMap) {
  baseColorsScss += `$base-color-${name}: ${color};\n`
}

const spacingEntries = numberEntries(readJson('space.json'))
const radiusEntries = numberEntries(readJson('radius.json'))
const typography = readJson('typography.json')
const fontFamily = typography.font['font-family'].$value
const quotedFontFamily = fontFamily
  .replaceAll('\\', String.raw`\\`)
  .replaceAll("'", String.raw`\'`)
let typographyScss = `${BANNER}@use 'sass:list';\n@use 'sass:map';\n\n$font-family-base: '${quotedFontFamily}', system-ui, -apple-system, sans-serif;\n`
let typographyCount = 1
for (const [group, prefix, format] of [
  ['font weight', 'font-weight', (_key, value) => `${value}`],
  ['font-size', 'font-size', (_key, value) => toRem(value)],
  ['Line-height', 'line-height', (_key, value) => toRem(value)],
  ['para-spacing', 'paragraph-spacing', (_key, value) => toRem(value)],
]) {
  typographyScss += '\n'
  const entries = numberEntries(typography[group])
  typographyCount += entries.length
  for (const [key, value] of entries) {
    typographyScss += `$${prefix}-${key}: ${format(key, value)};\n`
  }
}

// Figma text styles: a named size + line-height pair that exists in one or more weights.
const textStyles = Object.entries(readJson('text-styles.json')).filter(([name]) => !name.startsWith('$'))
const weightKeys = numberEntries(typography['font weight']).map(([key]) => key)
const sizeKeys = new Set(numberEntries(typography['font-size']).map(([key]) => key))
const lineHeightKeys = new Set(numberEntries(typography['Line-height']).map(([key]) => key))
typographyScss += `\n$font-weights: (\n${weightKeys.map((key) => `  ${key}: $font-weight-${key},`).join('\n')}\n);\n`
typographyScss += '\n$text-styles: (\n'
for (const [name, style] of textStyles) {
  if (!sizeKeys.has(style['font-size'])) throw new Error(`Text style ${name}: unknown font-size ${style['font-size']}`)
  if (!lineHeightKeys.has(style['line-height'])) {
    throw new Error(`Text style ${name}: unknown line-height ${style['line-height']}`)
  }
  for (const weight of style.weights) {
    if (!weightKeys.includes(weight)) throw new Error(`Text style ${name}: unknown weight ${weight}`)
  }
  typographyScss +=
    `  '${name}': (\n    font-size: $font-size-${style['font-size']},\n` +
    `    line-height: $line-height-${style['line-height']},\n    weights: (${style.weights.join(', ')}),\n  ),\n`
}
typographyScss += `);

// Applies a Figma text style. Without $weight the style's default (first listed) weight is used.
@mixin text-style($name, $weight: null) {
  $style: map.get($text-styles, $name);
  @if not $style {
    @error "Unknown text style '#{$name}'.";
  }
  $weights: map.get($style, weights);
  @if not $weight {
    $weight: list.nth($weights, 1);
  }
  @if not list.index($weights, $weight) {
    @error "Text style '#{$name}' has no '#{$weight}' weight. Available: #{$weights}.";
  }
  font-family: $font-family-base;
  font-size: map.get($style, font-size);
  line-height: map.get($style, line-height);
  font-weight: map.get($font-weights, $weight);
}
`
typographyCount += textStyles.length

const outputs = new Map([
  ['_root-colors.scss', rootColorsScss.trimEnd() + '\n'],
  ['_colors.scss', colorsScss],
  ['_base-colors.scss', baseColorsScss],
  ['_spacing.scss', dimensionScss('spacing', spacingEntries, spacingUnit)],
  ['_radius.scss', dimensionScss('radius', radiusEntries, (_key, value) => toPx(value))],
  ['_typography.scss', typographyScss],
  [
    '_index.scss',
    `${BANNER}@forward 'colors';\n@forward 'base-colors';\n@forward 'spacing';\n@forward 'radius';\n@forward 'typography';\n`,
  ],
])

if (process.argv.includes('--check')) {
  // Compare without rewriting files, so CI can detect stale or missing output.
  for (const [file, content] of outputs) {
    let actual
    try {
      actual = readFileSync(join(outDir, file), 'utf8')
    } catch {
      throw new Error(`Missing generated file ${file}. Run bun run tokens:build.`)
    }
    if (actual !== content) {
      throw new Error(`Stale generated file ${file}. Run bun run tokens:build.`)
    }
  }
  console.log('PASS: all generated tokens match the design-system exports')
} else {
  // Read and validate every input before writing any generated files.
  mkdirSync(outDir, { recursive: true })
  for (const [file, content] of outputs) {
    writeFileSync(join(outDir, file), content)
  }
  console.log(
    `Generated ${lightMap.size} color tokens per theme, ${baseMap.size} primitive colors, ` +
      `${spacingEntries.length} spacing tokens, ${radiusEntries.length} radius tokens, ` +
      `and ${typographyCount} typography tokens into src/components/v2/styles/tokens/`,
  )
}