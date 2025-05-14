const generateRsyncCommand = ({destination, excludes, source}) =>
    `rsync --compress --delete --delete-excluded --links --progress --recursive --stats --times --verbose --rsh=ssh ${excludes} "${source}" "${destination}"`;

const getExcludes = (excludes) => {
    if (excludes) {
        return excludes.map((item) => `--exclude=${item}`).join(' ');
    }

    return [];
};

export {generateRsyncCommand, getExcludes};
