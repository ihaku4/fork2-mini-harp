#!/usr/bin/env node
var createMiniHarp = require("mini-harp");
var parseArgs = require("minimist");
var port = parseArgs(process.argv)["port"] || 4000;
var app = createMiniHarp();
console.log("Starting miniharp on http://localhost:" + port);
app.listen(port);
