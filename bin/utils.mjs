import os from "node:os";
import process from "node:process";
import { execa } from "execa";

export const generateDefaultCommends = (destination) => {
  return [
    "clear",
    `find "${destination}" -type f -print0 | xargs -0 head -c 1 > /dev/null`,
    `echo "Backup started: $(date +'%m/%d/%Y %H:%M:%S')"`,
  ];
};

export const generateRsyncCommand = ({ destination, excludes, source }) =>
  `rsync --compress --delete --delete-excluded --links --progress --recursive --stats --times --verbose --rsh=ssh ${excludes} "${source}" "${destination}"`;

export const generateExcludes = (excludes) => {
  if (excludes) {
    return excludes.map((item) => `--exclude=${item}`).join(" ");
  }

  return [];
};

export const getComputerName = async () => {
  switch (process.platform) {
    case "win32":
      return process.env.COMPUTERNAME;
    case "darwin":
      return (await execa`scutil --get ComputerName`).stdout.toString().trim();
    case "linux": {
      const prettyname = (await execa`hostnamectl --pretty`).stdout
        .toString()
        .trim();
      return prettyname.length ? prettyname : os.hostname();
    }
    default:
      return os.hostname();
  }
};
