'use strict';

var _ = require('lodash');

function output(error, stdout, stderr, cmd) {
    if (!_.isEmpty(error)) {
        console.log(error.message);
    }
    if (!_.isEmpty(stdout)) {
        console.log(stdout);
    }
    if (!_.isEmpty(stderr)) {
        console.log(stderr);
    }
}

module.exports = {
    output: output
};