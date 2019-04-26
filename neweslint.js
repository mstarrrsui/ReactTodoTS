/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// The following is copied from `react-scripts/config/paths.js`.
const path = require('path');
const fs = require('fs');
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const projectRootPath = resolveApp('.');
const tsConfigPath = resolveApp('tsconfig.json');

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },

    // typescript-eslint specific options
    project: tsConfigPath,
    tsconfigRootDir: projectRootPath,
    warnOnUnsupportedTypeScriptVersion: true
  },

  plugins: [],

  // we are using the same rules as the create-react-app
  //   Inspired by https://github.com/airbnb/javascript but less opinionated.
  //    rules they enforce https://github.com/facebook/create-react-app/blob/eee8491d57d67dd76f0806a7512eaba2ce9c36f0/packages/eslint-config-react-app/index.js#L89:L98
  extends: ['react-app'],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },

  settings: {
    react: {
      version: 'detect'
    }
  }
};
