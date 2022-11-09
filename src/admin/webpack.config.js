'use strict';

const path = require('path');
const _ = require('lodash');

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  _.set(config, 'resolve.alias.assets', path.resolve(__dirname, './assets'));
  return config;
};
