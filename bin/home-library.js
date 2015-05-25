'use strict';

var local = require('./local'),
    rsync = require('./rsync'),
    remote = require('./remote');

function backup() {
    rsync.exec({
        source: local.home.library.preferences + '/' + 'com.github.atom.plist',
        destination: remote.home.library.preferences + '/',
        message: 'Backing up: Library > Atom',
        directories: 'Home/Library/Preferences'
    });

    rsync.exec({
        source: local.home.library.colorPickers,
        destination: remote.home.library.colorPickers,
        message: 'Backing up: Library > Color Pickers',
        directories: 'Home/Library/ColorPickers'
    });

    rsync.exec({
        source: local.home.library.preferences + '/' + 'com.bjango.istatmenus5.extras.plist',
        destination: remote.home.library.preferences + '/',
        message: 'Backing up: Library > iStat Menus',
        directories: 'Home/Library/Preferences'
    });

    rsync.exec({
        source: local.home.library.preferences + '/' + 'com.apple.symbolichotkeys.plist',
        destination: remote.home.library.preferences + '/',
        message: 'Backing up: Library > Keyboard Shortcuts',
        directories: 'Home/Library/Preferences'
    });

    rsync.exec({
        source: local.home.library.preferences + '/' + 'com.microsoft.Lync.plist',
        destination: remote.home.library.preferences + '/',
        message: 'Backing up: Library > Microsoft Lync',
        directories: 'Home/Library/Preferences'
    });

    rsync.exec({
        source: local.home.library.preferences + '/' + 'com.microsoft.Outlook.plist',
        destination: remote.home.library.preferences + '/',
        message: 'Backing up: Library > Microsoft Outlook',
        directories: 'Home/Library/Preferences'
    });

    rsync.exec({
        source: local.home.library.preferences + '/' + 'org.derailer.Paparazzi.plist',
        destination: remote.home.library.preferences + '/',
        message: 'Backing up: Library > Paparazzi',
        directories: 'Home/Library/Preferences'
    });

    rsync.exec({
        source: local.home.library.preferences + '/' + 'com.jetbrains.PhpStorm.plist',
        destination: remote.home.library.preferences + '/',
        message: 'Backing up: Library > PhpStorm',
        directories: 'Home/Library/Preferences'
    });
}

module.exports = {
    backup: backup
};