#! /usr/bin/env node

'use strict';

var rsync = require('./rsync'),

    home = '/Users/manovotny/',
    serverRoot = '8058@usw-s008.rsync.net:manovotny-rmbp/';

rsync.begin();

rsync.exec(
    home + 'Applications',
    serverRoot + 'Home',
    'Backing up Applications'
);

rsync.end();