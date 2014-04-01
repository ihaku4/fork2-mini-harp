#!/usr/bin/env node
var createMiniHarp = require("mini-harp");
var parseArgs = require("minimist");
var port = parseArgs(process.argv)["port"] || 4000;
var root = parseArgs(process.argv)["_"][2] || process.cwd();
console.log("Starting miniharp on http://localhost:" + port);
createMiniHarp(root).listen(port);
