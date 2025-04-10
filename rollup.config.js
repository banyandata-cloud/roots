import { babel as pluginBabel } from '@rollup/plugin-babel';
import pluginCommonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import pluginJSON from '@rollup/plugin-json';
import pluginResolve from '@rollup/plugin-node-resolve';
import pluginBundleSize from 'rollup-plugin-bundle-size';
import pluginPeerDepsExternal from 'rollup-plugin-peer-deps-external';
import pluginStyles from 'rollup-plugin-styles';
import { visualizer } from 'rollup-plugin-visualizer';

const packageJson = require('./package.json');

export default [
	{
		input: 'index.js',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true,
				inlineDynamicImports: true,
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: true,
				inlineDynamicImports: true,
			},
		],
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
		],
		plugins: [
			pluginPeerDepsExternal(),
			pluginBabel({
				extensions: ['.jsx', '.js', '.tsx'],
				exclude: 'node_modules/**',
			}),
			pluginResolve({
				extensions: ['.jsx', '.js', '.tsx'],
				exclude: 'node_modules/**',
			}),
			pluginStyles({
				modules: true,
			}),
			pluginCommonjs(),
			pluginJSON(),
			pluginBundleSize(),
			image(),
			visualizer({
				open: true, // Automatically open the visualization in browser
				template: 'treemap', // Options: treemap, sunburst, network
				gzipSize: true,
				brotliSize: true,
			}),
		],
	},
	{
		input: 'dist/esm/index.js',
		output: [
			{
				file: 'dist/index.js',
				format: 'esm',
				globals: {
					react: 'react',
				},
			},
		],
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
		],
	},
];
