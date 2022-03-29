// The source code including full typescript support is available at: 
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { webpackConfig: baseClientWebpackConfig, merge } = require('shakapacker');

const commonOptions = {
  resolve: {
    extensions: ['.css', '.ts', '.tsx'],
  },
};


// add sass resource loader from react-webpack-rails-tutorial
const sassLoaderConfig = {
  loader: 'sass-resources-loader',
  options: {
    resources: './app/javascript/assets/stylesheets/app-variables.scss',
  },
};

const scssConfigIndex = baseClientWebpackConfig.module.rules.findIndex((config) =>
  '.scss'.match(config.test),
);

baseClientWebpackConfig.module.rules[scssConfigIndex].use.push(sassLoaderConfig);


// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => merge({}, baseClientWebpackConfig, commonOptions);

module.exports = commonWebpackConfig;
