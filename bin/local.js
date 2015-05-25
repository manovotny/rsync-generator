'use strict';

var libraryPaths = require('./library-paths');

function getRoot() {
    return '/';
}

function getHomeRoot() {
    return getRoot() + 'Users/manovotny';
}
module.exports = {
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
