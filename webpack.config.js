const fs = require('fs');
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('atool-build/lib/webpack');
const pxtorem = require('postcss-pxtorem');


module.exports = function (webpackConfig, env) {
  webpackConfig.babel.babelrc = true;

  webpackConfig.babel.plugins.push('transform-runtime');

  webpackConfig.babel.plugins.push(['import', {
    style: 'css',
    libraryName: 'antd-mobile',
  }]);

  webpackConfig.postcss.push(pxtorem({
    rootValue: 100,
    unitPrecision: 5,
    propList: ['font', 'font-size', 'line-height', 'letter-spacing','padding', 'height', 'width', 'margin', 'padding-left', 'padding-right']
  }));

  webpackConfig.plugins.push( new CopyWebpackPlugin([{
    from: __dirname + '/favicon.ico',
    to: __dirname + '/build/mobile-mall-dashboard/'
  },{
    from: __dirname + '/index.html',
    to: __dirname + '/build/mobile-mall-dashboard/'
  },{
    from: __dirname + '/MP_verify_vFUrIuNITkmTulTh.txt',
    to: __dirname + '/build/mobile-mall-dashboard/'
  },{
    from: __dirname + '/src/img/',
    to: __dirname + '/build/mobile-mall-dashboard/img/'
  }]));

  return webpackConfig;
};
