# grunt-proxy-middleware

> proxy tool what uses http-proxy-middleware.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-proxy-middleware --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-proxy-middleware');
```

## The "proxy_middleware" task

### Overview
In your project's Gruntfile, add a section named `proxy_middleware` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  proxy_middleware: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Usage Examples

#### Options
In this example, the options just like options in `http-proxy-middleware`

```js
grunt.initConfig({
  proxyMiddleware: {
    options: {
      "/api": {
        target: "http://www.server.com",
        changeOrigin: true
      }
    },
  },

  // add Middleware in grunt-contrib-connect
  connect: {
    livereload: {
      middleware: function () {
        var middleware = [require("grunt-proxy-middleware/lib/utils").proxyRequest];
        // add other middlewares
        ...
        return middleware
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
