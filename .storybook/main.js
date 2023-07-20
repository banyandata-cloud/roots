const path = require('path');
module.exports = {
  stories: ['../components/**/*.stories.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y', 'storybook-addon-designs', '@storybook/addon-backgrounds', 'storybook-dark-mode'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  features: {
    interactionsDebugger: true,
    buildStoriesJson: true
  },
  babel: async options => ({
    ...options,
    presets: [...options.presets, ['@babel/preset-react', {
      runtime: 'automatic'
    }, 'preset-react-jsx-transform' // Can name this anything, just an arbitrary alias to avoid duplicate presets'
    ]]
  }),

  webpackFinal: async (config, {
    configType
  }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });

    // Return the altered config
    return config;
  },
  docs: {
    autodocs: true
  }
};