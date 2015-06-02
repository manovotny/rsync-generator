#! /usr/bin/env node

'use strict';

var config = require('./config'),
    run = require('./run'),
    write = require('./write'),
    validate = require('./validate');

validate.running();

if (config.write) {
    write.exec();
} else {
    run.exec();
}