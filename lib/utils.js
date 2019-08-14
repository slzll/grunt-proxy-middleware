var utils = module.exports;
var _ = require("lodash");
var grunt = require("grunt");

var proxies = [];
utils.setProxy = function(proxy) {
  proxies.push(proxy);
};

utils.reset = function() {
  proxies = [];
};

utils.matchContext = function(context, url) {
  var positiveContexts, negativeContexts, positiveMatch, negativeMatch;
  var contexts = context;
  if (!_.isArray(contexts)) {
    contexts = [contexts];
  }
  positiveContexts = _.filter(contexts, function(c) {
    return c.charAt(0) !== "!";
  });
  negativeContexts = _.filter(contexts, function(c) {
    return c.charAt(0) === "!";
  });
  // Remove the '!' character from the contexts
  negativeContexts = _.map(negativeContexts, function(c) {
    return c.slice(1);
  });
  negativeMatch = _.find(negativeContexts, function(c) {
    return url.lastIndexOf(c, 0) === 0;
  });
  // If any context negates this url, it must not be proxied.
  if (negativeMatch) {
    return false;
  }
  positiveMatch = _.find(positiveContexts, function(c) {
    return url.lastIndexOf(c, 0) === 0;
  });
  // If there is any positive match, lets proxy this url.
  return positiveMatch != null;
};

utils.proxyRequest = function(req, res, next) {
  var proxied = false;
  proxies.forEach(function(proxy) {
    if (!proxied && req.url && utils.matchContext(proxy.config.context, req.url)) {
      grunt.log.writeln("proxy set::" + req.url + " => " + proxy.config.target + req.url);
      proxy.middleware(req, res, next);
      proxied = true;
    }
  });
  if (!proxied) {
    next();
  }
};
