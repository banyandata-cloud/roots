import { babel as pluginBabel } from '@rollup/plugin-babel';
import pluginCommonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import pluginJSON from '@rollup/plugin-json';
import pluginResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pluginPeerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import pluginStyles from 'rollup-plugin-styles';
import { visualizer } from 'rollup-plugin-visualizer';
import packageJson from './package.json';

export default [
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
			'd3',
			'chart.js',
			'echarts',
			'@tiptap/react',
			'@tiptap/starter-kit',
			'@tiptap/pm',
			'react-chartjs-2',
			'echarts-for-react',
			'chartjs-plugin-annotation',
			'chartjs-plugin-datalabels',
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
				declarationMap: false,
				outDir: 'dist/esm',
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
			// Extract ONLY .scss / .module.scss imports from components
			postcss({
				// Any SCSS Modules imported inside components will be bundled here:
				extract: path.resolve('dist/roots-modules.css'),
				minimize: true,
				modules: {
					generateScopedName: '[local]__[hash:base64:5]',
				},
				use: {
					sass: {},
				},
				// IMPORTANT: do NOT run Tailwind here.
				// Tailwind is compiled by "build:css" to dist/roots.css
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
