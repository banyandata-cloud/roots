/** @type {import('tailwindcss').Config} */
module.exports = {
	// Prefix avoids collisions in consumer apps
	prefix: 'bn-',
	// Don’t reset host apps
	corePlugins: { preflight: false },

	// Scan only your library sources (and SB dev files)
	content: [
		'./src/components/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./stories/**/*.{ts,tsx,mdx}',
		'./.storybook/**/*.{ts,tsx,mdx}',
	],

	theme: {
		extend: {
			colors: {
				'primary-color1': '#bd3c45',
				'primary-color2': '#487349',
				'primary-color3': '#cba006',
				'primary-color4': 'blue-600',
				'text-color': '#141920',
				'secondary-color1': '#2e37ff',
				'secondary-color2': '#0f62fe',
				grey: '#737373',
				'dark-grey': '#333333',
				grey4: '#c4c4c4',
				'mono-color1': '#71839b',
				'mono-color2': '#b7cadb',
				'mono-color3': 'a8adb2',
				grey10: '#f7f7f7',
				grey1: '#888888',
				grey5: '#dddddd',
				'background-color1': '#ffebec',
				'background-color2': '#edffed',
				'background-color3': '#fff6d4',
				'background-color4': '#e6edff',
				'background-color5': '#cfdfff',
				'light-color3': '#ffffff',
			},
			keyframes: {
				shimmer: {
					'0%': { 'background-position': '-50rem 0' },
					'100%': { 'background-position': '50rem 0' },
				},
			},
			animation: {
				shimmer: 'shimmer 1.25s linear infinite',
			},
			borderRadius: { xl: '0.75rem', '2xl': '1rem' },
			spacing: { 4.5: '1.125rem' },
		},
	},

	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		function addDataStateVariant({ addVariant }) {
			addVariant('state-open', '&[data-state="open"]');
		},
	],

	// If you build dynamic class strings, add a safelist:
	// safelist: [{ pattern: /bn-(bg|text|ring)-(primary|red|green)-(50|100|200|500|700)/ }]
};
