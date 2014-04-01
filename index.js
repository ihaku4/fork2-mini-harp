var connect = require('connect');
var serveStatic = require("serve-static");

var app = function(root) {
    return connect()
        .use(serveStatic(root, {index: "index.js"}));
}
module.exports = app;
