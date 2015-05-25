'use strict';

var libraryPaths = require('./library-paths');

function getServer() {
    return '8058@usw-s008.rsync.net';
}

function getServerWithComputerId() {
    return getServer() + ':/' + 'manovotny-rmbp';
}

function getRoot() {
    return getServerWithComputerId() + '/' + 'Root';
}

function getHomeRoot() {
    return getServerWithComputerId() + '/' + 'Home';
}

module.exports = {
    address: getServer(),
    home: {
        root: getHomeRoot(),
        library: {
            applicationSupport: getHomeRoot() + libraryPaths.applicationSupport,
            colorPickers: getHomeRoot() + libraryPaths.colorPickers,
            preferences: getHomeRoot() + libraryPaths.preferences,
            spelling: getHomeRoot() + libraryPaths.spelling
        }
    },
    root: getRoot()
};