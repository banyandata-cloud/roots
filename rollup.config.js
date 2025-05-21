import { babel as pluginBabel } from '@rollup/plugin-babel';
import pluginCommonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import pluginJSON from '@rollup/plugin-json';
import pluginResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pluginPeerDepsExternal from 'rollup-plugin-peer-deps-external';
import pluginStyles from 'rollup-plugin-styles';
import { visualizer } from 'rollup-plugin-visualizer';

export default [
	{
		input: 'src/index.ts',
		output: {
			preserveModules: true,
			format: 'esm',
			sourcemap: true,
			dir: 'dist/esm',
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
				declaration: false,
			}),
			pluginBabel({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
			}),
			pluginResolve({
				extensions: ['.jsx', '.js', '.tsx', '.ts'],
				exclude: 'node_modules/**',
			}),
			pluginStyles({
				modules: true,
			}),
			pluginCommonjs(),
			pluginJSON(),
			image(),
			visualizer({
				open: true,
				template: 'treemap', // Options: treemap, sunburst, network
				gzipSize: true,
				brotliSize: true,
			}),
		],
	},
];
