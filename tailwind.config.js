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
				primary: 'rgb(var(--bn-primary) / <alpha-value>)',
				surface: 'rgb(var(--bn-surface) / <alpha-value>)',
				text: 'rgb(var(--bn-text) / <alpha-value>)',
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
