#! /usr/bin/env node

'use strict';

var shell = require('shelljs'),

    home = require('./home'),
    process = require('./process'),
    root = require('./root');

if (process.running()) {
    console.log('The backup script is already running.');
    shell.exit(0);
}

process.begin();

root.backup();
home.backup();

process.end();