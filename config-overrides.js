const rewireSass = require('react-app-rewire-scss');

module.exports = (config, env) => {
  config = requireSass( config, env );
 
  return config;
};