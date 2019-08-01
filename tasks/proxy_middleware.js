/*
 * grunt-proxy-middleware
 * https://github.com/zll/grunt-proxy-middleware
 *
 * Copyright (c) 2019 slzll
 * Licensed under the MIT license.
 */

"use strict";
var utils = require("../lib/utils");
var _ = require("lodash");

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask("proxy_middleware", "proxy tool what uses http-proxy-middleware", function() {
    // setup proxy
    var httpProxy = require("http-proxy-middleware");
    if (_.isString(this.data)) {
      var middleware = httpProxy(this.data);
      utils.setProxy({ middleware: middleware, config: {} });
    } else {
      var proxyOptions = [];
      if (_.isArray(this.data)) {
        proxyOptions = this.data;
      } else if (_.isObject(this.data)) {
        for (var key in this.data) {
          proxyOptions.push(_.extend({}, this.data[key], { context: key }));
        }
      }

      proxyOptions.forEach(function(config) {
        var middleware = httpProxy(config.context, config);
        utils.setProxy({ middleware: middleware, config: config });
      });
    }
  });
};
