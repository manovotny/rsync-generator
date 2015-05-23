'use strict';

var _ = require('lodash'),

    base = {
        args: [
            '--compress',
            '--delete',
            '--links',
            '--progress',
            '--recursive',
            '--stats',
            '--times',
            '--verbose'
        ],
        exclude: [
            '.DS_Store',
            'bower_components',
            'node_modules',
            'vendor'
        ],
        ssh: true
    },
    localToServer = _.extend(_.clone(base), {
        src: '/Users/manovotny/Downloads/test',
        dest: '8058@usw-s008.rsync.net:'
    }),
    serverToLocal = _.extend(_.clone(base), {
        src: '8058@usw-s008.rsync.net:test',
        dest: '/Users/manovotny/Downloads'
    });

module.exports = {
    localToServer: localToServer,
    serverToLocal: serverToLocal
};