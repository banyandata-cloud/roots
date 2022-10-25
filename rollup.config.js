import pluginResolve from '@rollup/plugin-node-resolve';
import pluginCommonjs from '@rollup/plugin-commonjs';
import { babel as pluginBabel } from '@rollup/plugin-babel';
import pluginPostcss from 'rollup-plugin-postcss';
import pluginPeerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default [
	{
		input: 'index.js',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: true,
			},
		],
		external: ['react'],
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
			pluginPostcss(),
			pluginCommonjs(),
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
		external: ['react'],
	},
];
