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
    if (name.startsWith('fg-') || name.startsWith('bg-')) {
      rootColorsScss += `  --${name}: var(--color-${name});\n`
    }
  }
  rootColorsScss += '}\n\n'
}

let colorsScss = `${BANNER}// Runtime theme-aware aliases; emits no CSS.\n`
for (const name of lightMap.keys()) {
  colorsScss += `$color-${name}: var(--color-${name});\n`
}

const shadowTokens = readJson('shadow.json')
const shadowThemes = { light: new Map(), dark: new Map() }
for (const [size, token] of Object.entries(shadowTokens.scale.light.shadow)) {
  if (!token || typeof token.value !== 'string') {
    throw new Error(`Expected a shadow value for scale/light/${size}`)
  }
  shadowThemes.light.set(`scale-${toKebabCase(size)}`, token.value)
}
for (const [size, token] of Object.entries(shadowTokens.scale.dark.shadow)) {
  if (!token || typeof token.value !== 'string') {
    throw new Error(`Expected a shadow value for scale/dark/${size}`)
  }
  shadowThemes.dark.set(`scale-${toKebabCase(size)}`, token.value)
}

const shadowStateNames = []
for (const [state, definition] of Object.entries(shadowTokens.state)) {
  if (state === 'focus') {
    continue
  }
  const stateName = toKebabCase(state)
  shadowStateNames.push(stateName)
  for (const theme of ['light', 'dark']) {
    for (const [variant, token] of Object.entries(definition[theme])) {
      if (variant.startsWith('$')) {
        continue
      }
      if (!token || typeof token.value !== 'string') {
        throw new Error(`Expected a shadow value for state/${state}/${theme}/${variant}`)
      }
      shadowThemes[theme].set(
        `state-${stateName}-${toKebabCase(variant)}`,
        token.value,
      )
    }
  }
}

const shadowKeys = new Set([...shadowThemes.light.keys(), ...shadowThemes.dark.keys()])
for (const key of shadowKeys) {
  if (!shadowThemes.light.has(key) || !shadowThemes.dark.has(key)) {
    throw new Error(`Shadow token "${key}" must exist in both light and dark themes`)
  }
}

const focusShadows = new Map()
for (const [variant, token] of Object.entries(shadowTokens.state.focus)) {
  if (variant.startsWith('$') || variant === 'gap' || typeof token?.value !== 'string') {
    continue
  }
  focusShadows.set(`state-focus-${toKebabCase(variant)}`, token.value)
  for (const variable of token.value.matchAll(/var\((--[a-z0-9-]+)\)/g)) {
    const colorName = variable[1].slice(2)
    if (!lightMap.has(colorName) || !darkMap.has(colorName)) {
      throw new Error(`Focus shadow ${variant} references missing color token "${colorName}"`)
    }
  }
}

let rootShadowsScss = `${BANNER}// Include once in the application's global stylesheet.\n`
for (const { selector, theme } of [
  { selector: ':root', theme: 'light' },
  { selector: "[data-theme='dark']", theme: 'dark' },
]) {
  rootShadowsScss += `${selector} {\n`
  for (const [name, value] of shadowThemes[theme]) {
    rootShadowsScss += `  --shadow-${name}: ${value};\n`
  }
  if (theme === 'light') {
    for (const [name, value] of focusShadows) {
      rootShadowsScss += `  --shadow-${name}: ${value};\n`
    }
  }
  rootShadowsScss += '}\n\n'
}

let shadowsScss = `${BANNER}// Theme-aware shadow aliases; include _root-shadows.scss once globally.\n`
const shadowGroups = new Map([
  ['scale', [...shadowThemes.light.keys()].filter((name) => name.startsWith('scale-'))],
  ...shadowStateNames.map((state) => [
    `state-${state}`,
    [...shadowThemes.light.keys()].filter((name) => name.startsWith(`state-${state}-`)),
  ]),
  ['state-focus', [...focusShadows.keys()]],
])
for (const [group, names] of shadowGroups) {
  shadowsScss += `\n$shadow-${group}: (\n`
  for (const name of names) {
    const suffix = name.startsWith(`${group}-`) ? name.slice(group.length + 1) : name
    shadowsScss += `  '${suffix}': var(--shadow-${name}),\n`
  }
  shadowsScss += ');\n'
  for (const name of names) {
    shadowsScss += `$shadow-${name}: var(--shadow-${name});\n`
  }
}

const buttonEntries = numberEntries(readJson('button.json'))
let buttonScss = `${BANNER}$button-size: (\n`
for (const [key, value] of buttonEntries) {
  buttonScss += `  '${key}': ${value}px,\n`
}
buttonScss += ');\n\n'
for (const [key, value] of buttonEntries) {
  buttonScss += `$button-size-${key}: ${value}px;\n`
}

const tagColors = readJson('tag/colors.json')
let tagColorsScss = `${BANNER}// Static semantic colors for tag variants.\n`
let tagColorCount = 0
for (const [variant, tokens] of Object.entries(tagColors)) {
  if (variant.startsWith('$')) {
    continue
  }
  const variantName = toKebabCase(variant)
  const entries = Object.entries(tokens).map(([key, token]) => {
    if (token.$type !== 'color' || typeof token.$value !== 'string') {
      throw new Error(`Expected a hex color for tag/colors/${variant}/${key}`)
    }
    return [toKebabCase(key), token.$value]
  })
  tagColorCount += entries.length
  tagColorsScss += `\n$tag-color-${variantName}: (\n`
  for (const [key, color] of entries) {
    tagColorsScss += `  '${key}': ${color},\n`
  }
  tagColorsScss += ');\n'
  for (const [key, color] of entries) {
    tagColorsScss += `$tag-${variantName}-${key}: ${color};\n`
  }
}

const tagSizes = readJson('tag/dismissible.json')
let tagSizesScss = `${BANNER}// Dismissible tag dimensions and spacing, grouped by size/variant.\n`
let tagSizeTokenCount = 0
for (const [size, tokens] of Object.entries(tagSizes)) {
  if (size.startsWith('$')) {
    continue
  }
  const sizeName = toKebabCase(size)
  tagSizesScss += `\n$tag-dismissible-${sizeName}: (\n`
  const entries = []
  for (const [key, token] of Object.entries(tokens)) {
    if (token.$type !== 'number' || !Number.isFinite(token.$value)) {
      throw new Error(`Expected a finite number for tag/dismissible/${size}/${key}`)
    }
    const tokenName = toKebabCase(key)
    tagSizesScss += `  '${tokenName}': ${token.$value}px,\n`
    entries.push([tokenName, token.$value])
    tagSizeTokenCount += 1
  }
  tagSizesScss += ');\n'
  for (const [tokenName, value] of entries) {
    tagSizesScss += `$tag-dismissible-${sizeName}-${tokenName}: ${value}px;\n`
  }
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
  ['_root-shadows.scss', rootShadowsScss.trimEnd() + '\n'],
  ['_shadows.scss', shadowsScss],
  ['_button.scss', buttonScss],
  ['_tag-colors.scss', tagColorsScss],
  ['_tag-dismissible.scss', tagSizesScss],
  [
    '_index.scss',
    `${BANNER}@forward 'colors';\n@forward 'base-colors';\n@forward 'spacing';\n@forward 'radius';\n@forward 'typography';\n@forward 'shadows';\n@forward 'button';\n@forward 'tag-colors';\n@forward 'tag-dismissible';\n`,
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
      `${typographyCount} typography tokens, ${shadowKeys.size + focusShadows.size} shadow tokens, ` +
      `${buttonEntries.length} button sizes, ${tagColorCount} tag colors, and ` +
      `${tagSizeTokenCount} dismissible tag tokens into src/styles/tokens/`,
  )
}