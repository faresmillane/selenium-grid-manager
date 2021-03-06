#! /usr/bin/env node
const args = process.argv;
const drivers = require("./../lib/install");
const selenium = require("../lib/run");
const clean = require("./../lib/clear");

if(args[2] === 'install') {
    drivers.install();
} else if (args[2] === 'update') {
    drivers.install();
} else if (args[2] === 'start') {
    selenium.start();
} else if (args[2] === 'restart') {
    selenium.restart();
} else if (args[2] === 'clean') {
    clean.clearAvailabilityPorts();
} else {
    console.log('\x1b[31m', `Error: Cannot find <${args[2]}> command !`);
    console.log('\033[36m', `Available commands : install, update, start, restart, clean`);
};
