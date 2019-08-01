/*
 * grunt-proxy-middleware
 * https://github.com/zll/grunt-proxy-middleware
 *
 * Copyright (c) 2019 slzll
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ["Gruntfile.js", "tasks/*.js", "<%= nodeunit.tests %>"],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ["tmp"]
    },

    // Configure with connect
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: "0.0.0.0",
        livereload: 35732
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }
            // set middleware
            var middlewares = [require("./lib/utils").proxyRequest];
            return middlewares;
          }
        }
      }
    },

    // Configuration to be run (and then tested).
    proxy_middleware: {
      proxy_options: {
        "/api": {
          target: "http://www.server.com",
          changeOrigin: true,
          https: false
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ["test/*_test.js"]
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks("tasks");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-nodeunit");

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask("test", ["clean", "proxy_middleware", "nodeunit"]);

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "test"]);
};
