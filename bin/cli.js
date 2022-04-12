const args = process.argv;
const { exec } = require('child_process');
const { stdout } = require('process');

if(args[2] === 'install') {
    exec(`node lib/install`);
} else if (args[2] === 'start') {
    exec(`node lib/start`, (error, stdout) => {
        console.info(stdout);
    })
} else if (args[2] === 'restart') {
    exec(`node lib/restart`);
};
