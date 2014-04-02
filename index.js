var connect = require('connect');
var serveStatic = require("serve-static");
var fs = require("fs");
var assetsPath = "verify/assets"
var jade = require("jade");
var less = require("less");

var app = function(root) {
    return connect()
        .use(function(req, res, next) {
            if (/(\.jade$)|(\.less$)/.test(req.url)) {
                res.statusCode = 404;
                res.setHeader("Content-Length", 0);
                //res.contentLength = 0;
                //res.writeHeader(404, {"Content-Length": 0})
                //res.setHeader("Content-Length", 0);
                res.end();
            } else next();
        })
//        .use(serveStatic(root))
        .use( function(req, res, next) {
            if (req.url === "/foo.html") {
                fs.readFile(assetsPath + "/foo.jade", function(err, data) {
                   if (err) throw err;
                   jade.render(data, function(err, html) {
                        if (err) next();
                        res.setHeader("Content-Length", html.length);
                        res.setHeader("Content-Type", "text/html; charset=UTF-8");
                        res.end(html);
                   });
                });
            } else if (req.url === "/index.html" || req.url === "/") {
                fs.readFile(assetsPath + "/index.jade", function(err, data) {
                   if (err) throw err;
                   jade.render(data, function(err, html) {
                        if (err) next();
                        res.setHeader("Content-Length", html.length);
                        res.setHeader("Content-Type", "text/html; charset=UTF-8");
                        res.end(html);
                   });
                });
            } else if (req.url === "/bar.html") {
//                serveStatic(assetsPath + req.url)(req, res, next);
                fs.readFile(assetsPath + req.url, function(err, data) {
                    if (err) throw err;
                    res.setHeader("Content-Length", data.length);
                    res.setHeader("Content-Type", "text/html; charset=UTF-8");
                    res.end(data);
                });
            } else if (req.url === "/foo.css") {
                fs.readFile(assetsPath + "/foo.less", function(err, data) {
                    if (err) throw err;
                    data = new String(data);
                    less.render(data, function(err, css) {
                        if (err) next();
                        res.setHeader("Content-Length", css.length);
                        res.setHeader("Content-Type", "text/css; charset=UTF-8");
                        res.end(css);
                    });
                })
            } else if (req.url === "/bar.css") {
//                serveStatic(assetsPath + req.url)(req, res, next);
                fs.readFile(assetsPath + req.url, function(err, data) {
                    if (err) throw err;
                    res.setHeader("Content-Length", data.length);
                    res.setHeader("Content-Type", "text/css; charset=UTF-8");
                    res.end(data);
                });
            } else next();
        } ) ;
}
module.exports = app;
