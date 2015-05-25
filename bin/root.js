'use strict';

var local = require('./local'),
    rsync = require('./rsync'),
    remote = require('./remote');

function backup() {
    rsync.exec({
        source: local.root + 'etc/php.ini',
        destination: remote.root + '/etc/',
        message: 'Backing up ' + 'etc/php.ini',
        directories: 'Root/etc'
    });
}

module.exports = {
    backup: backup
};