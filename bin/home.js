'use strict';

var directories = require('./home-directories'),
    dotFiles = require('./home-dot-files'),
    library = require('./home-library');

function backup() {
    //directories.backup();
    //dotFiles.backup();
    library.backup();
}

module.exports = {
    backup: backup
};