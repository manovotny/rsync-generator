#! /usr/bin/env node

'use strict';

var shell = require('shelljs'),

    rsync = require('./rsync'),

    home = '/Users/manovotny/',
    serverRoot = '8058@usw-s008.rsync.net:manovotny-rmbp/';

if (rsync.isRunning()) {
    console.log('The backup script is already running.');
    shell.exit(0);
}

rsync.begin();

rsync.exec(
    home + 'Applications',
    serverRoot + 'Home',
    'Backing up Applications'
);

rsync.exec(
    home + 'Backup',
    serverRoot + 'Home',
    'Backing up Backup'
);

rsync.end();