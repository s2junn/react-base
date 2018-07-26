const rewireSass = require('react-app-rewire-scss');
const reactSvgLoader = require('react-app-rewire-react-svg-loader');

module.exports = function override(config, env) {
  config = rewireSass(config, env);
  // with loaderOptions
  // config = rewireSass.withLoaderOptions(someLoaderOptions)(config, env);
	config = reactSvgLoader(config, env);
	return config;
};