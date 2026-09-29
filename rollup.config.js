import { babel as pluginBabel } from '@rollup/plugin-babel';
import pluginCommonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import pluginJSON from '@rollup/plugin-json';
import pluginResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pluginPeerDepsExternal from 'rollup-plugin-peer-deps-external';
import pluginStyles from 'rollup-plugin-styles';
import { visualizer } from 'rollup-plugin-visualizer';
import packageJson from './package.json';

export default [
	// Main package ESM build
	{
		input: 'src/index.ts',
		output: {
			file: packageJson.module,
			format: 'esm',
			sourcemap: true,
			inlineDynamicImports: true,
		},
		external: [
			'react',
			'react-dom',
			'framer-motion',
			'echarts',
			'@tiptap/react',
			'@tiptap/starter-kit',
			'@tiptap/pm',
			'echarts-for-react',
			'fast-equals',
			'react-error-boundary',
			'@tiptap/extension-color',
			'@tiptap/extension-highlight',
			'@tiptap/extension-link',
			'@tiptap/extension-placeholder',
			'@tiptap/extension-text-align',
			'@tiptap/extension-text-style',
			'@tiptap/extension-underline',
			'react-syntax-highlighter',
		],
		plugins: [
			pluginPeerDepsExternal(),
			typescript({
				tsconfig: './tsconfig.json',
				declaration: true,
				rootDir: 'src',
				sourceMap: true,
				exclude: [
					'node_modules/**',
					'**/*.test.ts',
					'**/*.test.tsx',
					'**/*.stories.tsx',
					'src/**/*.stories.*',
				],
			}),
			pluginBabel({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
			}),
			pluginResolve({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
			}),
			pluginStyles({
				modules: true,
			}),
			pluginCommonjs(),
			pluginJSON(),
			image(),
		],
	},
	// Main package CJS build
	{
		input: 'src/index.ts',
		output: {
			file: packageJson.main,
			format: 'cjs',
			sourcemap: true,
			inlineDynamicImports: true,
		},
		external: [
			'react',
			'react-dom',
			'framer-motion',
			'echarts',
			'@tiptap/react',
			'@tiptap/starter-kit',
			'@tiptap/pm',
			'echarts-for-react',
			'fast-equals',
			'react-error-boundary',
			'@tiptap/extension-color',
			'@tiptap/extension-highlight',
			'@tiptap/extension-link',
			'@tiptap/extension-placeholder',
			'@tiptap/extension-text-align',
			'@tiptap/extension-text-style',
			'@tiptap/extension-underline',
			'react-syntax-highlighter',
		],
		plugins: [
			pluginPeerDepsExternal(),
			typescript({
				tsconfig: './tsconfig.json',
				compilerOptions: {
					declaration: false,
					declarationMap: false,
					outDir: './dist/cjs',
				},
				sourceMap: true,
				exclude: [
					'node_modules/**',
					'**/*.test.ts',
					'**/*.test.tsx',
					'**/*.stories.tsx',
					'src/**/*.stories.*',
				],
			}),
			pluginBabel({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
			}),
			pluginResolve({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
			}),
			pluginStyles({
				modules: true,
			}),
			pluginCommonjs(),
			pluginJSON(),
			image(),
		],
	},
	// V2 package ESM build (published separately from ./v2)
	{
		input: 'src/components/v2/index.ts',
		output: {
			file: 'v2/dist/esm/index.js',
			format: 'esm',
			sourcemap: true,
			inlineDynamicImports: true,
		},
		external: [
			'react',
			'react-dom',
			'framer-motion',
			'echarts',
			'@tiptap/react',
			'@tiptap/starter-kit',
			'@tiptap/pm',
			'echarts-for-react',
			'fast-equals',
			'react-error-boundary',
			'@tiptap/extension-color',
			'@tiptap/extension-highlight',
			'@tiptap/extension-link',
			'@tiptap/extension-placeholder',
			'@tiptap/extension-text-align',
			'@tiptap/extension-text-style',
			'@tiptap/extension-underline',
			'react-syntax-highlighter',
		],
		plugins: [
			pluginPeerDepsExternal(),
			typescript({
				tsconfig: './tsconfig.json',
				compilerOptions: {
					declaration: true,
					declarationMap: true,
					rootDir: 'src',
					outDir: 'v2/dist/esm',
				},
				sourceMap: true,
				exclude: [
					'node_modules/**',
					'**/*.test.ts',
					'**/*.test.tsx',
					'**/*.stories.tsx',
					'src/**/*.stories.*',
				],
			}),
			pluginBabel({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
			}),
			pluginResolve({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
			}),
			pluginStyles({
				modules: true,
			}),
			pluginCommonjs(),
			pluginJSON(),
			image(),
		],
	},
	// V2 package CJS build (published separately from ./v2)
	{
		input: 'src/components/v2/index.ts',
		output: {
			file: 'v2/dist/cjs/index.js',
			format: 'cjs',
			sourcemap: true,
			inlineDynamicImports: true,
		},
		external: [
			'react',
			'react-dom',
			'framer-motion',
			'echarts',
			'@tiptap/react',
			'@tiptap/starter-kit',
			'@tiptap/pm',
			'echarts-for-react',
			'fast-equals',
			'react-error-boundary',
			'@tiptap/extension-color',
			'@tiptap/extension-highlight',
			'@tiptap/extension-link',
			'@tiptap/extension-placeholder',
			'@tiptap/extension-text-align',
			'@tiptap/extension-text-style',
			'@tiptap/extension-underline',
			'react-syntax-highlighter',
		],
		plugins: [
			pluginPeerDepsExternal(),
			typescript({
				tsconfig: './tsconfig.json',
				compilerOptions: {
					declaration: false,
					declarationMap: false,
					outDir: 'v2/dist/cjs',
				},
				sourceMap: true,
				exclude: [
					'node_modules/**',
					'**/*.test.ts',
					'**/*.test.tsx',
					'**/*.stories.tsx',
					'src/**/*.stories.*',
				],
			}),
			pluginBabel({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
			}),
			pluginResolve({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
			}),
			pluginStyles({
				modules: true,
			}),
			pluginCommonjs(),
			pluginJSON(),
			image(),
			visualizer({
				open: true,
				template: 'flamegraph',
				gzipSize: true,
				brotliSize: true,
			}),
		],
	},
];
