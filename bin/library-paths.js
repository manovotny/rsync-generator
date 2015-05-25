'use strict';

function getLibrary() {
    return '/Library';
}

module.exports = {
    applicationSupport: getLibrary() + '/"Application\\ Support"',
    colorPickers: getLibrary() + '/ColorPickers',
    preferences: getLibrary() + '/Preferences',
    spelling: getLibrary() + '/Spelling'
};
