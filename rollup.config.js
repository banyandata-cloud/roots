import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

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
			babel({
				extensions: ['.jsx', '.js', '.tsx'],
				exclude: 'node_modules/**',
			}),
			resolve({
				extensions: ['.jsx', '.js', '.tsx'],
				exclude: 'node_modules/**',
			}),
			postcss(),
			commonjs(),
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
