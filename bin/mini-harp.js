#!/usr/bin/env node
var createMiniHarp = require("mini-harp");
var parseArgs = require("minimist");
var port = parseArgs(process.argv)["port"] || 4000;
console.log("Starting miniharp on http://localhost:" + port);
createMiniHarp()
    .use(function(req, res, next) {
        if (req.url === "/") res.end((new Date()).toISOString());
        else next();
    })
    .listen(port);
