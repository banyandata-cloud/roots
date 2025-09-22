module.exports = {
	plugins: [
		require('postcss-import'), // must be first
		require('tailwindcss')({ config: './tailwind.config.js' }),
		require('autoprefixer'),
	],
};
