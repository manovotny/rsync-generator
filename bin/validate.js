'use strict';

var _ = require('lodash');

function config(c) {
    return c.hasOwnProperty('destination') && c.destination.length && c.hasOwnProperty('sources');
}

module.exports = {
    config: config
};