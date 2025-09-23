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
