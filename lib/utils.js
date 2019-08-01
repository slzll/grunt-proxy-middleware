var utils = module.exports;
var _ = require("lodash");

utils.proxies = [];
utils.setProxy = function(proxy) {
  utils.proxies.push(proxy);
};

utils.proxyRequest = function(req, res, next) {
  var proxied = false;
  utils.proxies.forEach(function(proxy) {
    if (!proxied && req) {
      proxy.middleware(req, res, next);
      proxied = true;
    }
  });
  if (!proxied) {
    next();
  }
};
