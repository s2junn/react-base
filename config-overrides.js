const reactSvgLoader = require('react-app-rewire-react-svg-loader');

module.exports = function override(config, env) {

	config = reactSvgLoader(config, env);
	return config;
};