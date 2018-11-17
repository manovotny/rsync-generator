export const generateRsyncCommand = ({destination, excludes, source}) =>
    `rsync --compress --delete --links --progress --recursive --relative --stats --times --verbose --rsh=ssh ${excludes} "${source}" "${destination}"`;

export const getExcludes = (excludes) => {
    if (excludes) {
        return excludes.map((item) => `--exclude=${item}`).join(' ');
    }

    return [];
};
