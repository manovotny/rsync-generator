#! /usr/bin/env node

'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    shell = require('shelljs'),

    runBackup = require('./backup-run'),
    writeBackup = require('./backup-write'),
    process = require('./process'),
    validate = require('./validate'),

    configPath = './bin/config.json',
    config;

if (process.running()) {
    console.log('The backup script is already running.');
    shell.exit(0);
}

if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync('./bin/config.json', 'utf8'));
} else {
    console.log('Cannot find config file.');
    shell.exit(0);
}

if (!validate.config(config)) {
    console.log('Invalid config file.');
    shell.exit(0);
}

if (config.hasOwnProperty('write') && config.write.length) {
    writeBackup.exec(config);
} else {
    runBackup.exec(config);
}