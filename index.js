var connect = require('connect');
var serveStatic = require("serve-static");
var fs = require("fs");
var assetsPath = "verify/assets"
var jade = require("jade");
var less = require("less");

var app = function(root) {
    return connect()
//        .use(serveStatic(root))
        .use( function(req, res, next) {
            if (req.url === "/foo.html") {
                fs.readFile(assetsPath + "/foo.jade", function(err, data) {
                   if (err) throw err;
                   jade.render(data, function(err, html) {
                        if (err) next();
                        res.end(html);
                   });
                });
            } else if (req.url === "/bar.html") {
//                serveStatic(assetsPath + req.url)(req, res, next);
                fs.readFile(assetsPath + req.url, function(err, data) {
                    if (err) throw err;
                    res.end(data);
                });
            } else if (req.url === "/foo.css") {
                fs.readFile(assetsPath + "/foo.less", function(err, data) {
                    if (err) throw err;
                    data = new String(data);
                    less.render(data, function(err, css) {
                        if (err) next();
                        res.end(css);
                    });
                })
            } else if (req.url === "/bar.css") {
//                serveStatic(assetsPath + req.url)(req, res, next);
                fs.readFile(assetsPath + req.url, function(err, data) {
                    if (err) throw err;
                    res.end(data);
                });
            } else next();
        } );
}
module.exports = app;
