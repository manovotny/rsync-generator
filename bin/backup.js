#! /usr/bin/env node

'use strict';

var _ = require('lodash'),
    options = require('./options'),
    output = require('./output').output,
    rsync = require('rsyncwrapper').rsync;

rsync(options.localToServer, output);