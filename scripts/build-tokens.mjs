#!/usr/bin/env node
/* Regenerates src/styles/tokens/*.scss from the Figma exports in design-system/. */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokensDir = join(rootDir, 'design-system')
const outDir = join(rootDir, 'src/styles/tokens')
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

function dimensionScss(name, entries) {
  let scss = `${BANNER}$${name}: (\n`
  for (const [key, value] of entries) {
    scss += `  '${key}': ${value}px,\n`
  }
  scss += ');\n\n'
  for (const [key, value] of entries) {
    scss += `$${key}: ${value}px;\n`
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
let typographyScss = `${BANNER}$font-family-base: '${quotedFontFamily}', system-ui, -apple-system, sans-serif;\n`
let typographyCount = 1
for (const [group, prefix, unit] of [
  ['font weight', 'font-weight', ''],
  ['font-size', 'font-size', 'px'],
  ['Line-height', 'line-height', 'px'],
  ['para-spacing', 'paragraph-spacing', 'px'],
]) {
  typographyScss += '\n'
  const entries = numberEntries(typography[group])
  typographyCount += entries.length
  for (const [key, value] of entries) {
    typographyScss += `$${prefix}-${key}: ${value}${unit};\n`
  }
}

const outputs = new Map([
  ['_root-colors.scss', rootColorsScss.trimEnd() + '\n'],
  ['_colors.scss', colorsScss],
  ['_base-colors.scss', baseColorsScss],
  ['_spacing.scss', dimensionScss('spacing', spacingEntries)],
  ['_radius.scss', dimensionScss('radius', radiusEntries)],
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
      `and ${typographyCount} typography tokens into src/styles/tokens/`,
  )
}