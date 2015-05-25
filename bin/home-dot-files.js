'use strict';

var local = require('./local'),
    rsync = require('./rsync'),
    remote = require('./remote');

function exec(resource) {
    rsync.exec({
        source: local.home.root + '/' + resource,
        destination: remote.home.root,
        message: 'Backing up ' + resource,
        directories: 'Home'
    });
}

function backup() {
    exec('.atom');
    exec('.bash_profile');
    exec('.gitconfig');
    exec('.ssh');
}

module.exports = {
    backup: backup
};