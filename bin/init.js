#! /usr/bin/env node
const { exec } = require('child_process');

exec(`sh ./node_modules/selenium-grid-manager/lib/drivers.sh`);