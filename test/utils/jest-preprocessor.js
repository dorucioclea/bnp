'use strict';

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');
require('./in-depth');

module.exports = {
  process(src, filename) {
    return babel.transform(src, {
      filename,
      presets: [jestPreset],
      retainLines: true
    }).code;
  }
};
