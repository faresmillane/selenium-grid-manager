#! /usr/bin/env node
const args = process.argv;
const server = require("./../lib/server");
const drivers = require("./../lib/install");
const selenium = require("./../lib/restart");

if(args[2] === 'install') {
    drivers.install();
} else if (args[2] === 'start') {
    server.start();
} else if (args[2] === 'restart') {
    selenium.restart();
};
