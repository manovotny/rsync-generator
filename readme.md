# rsync-generator

> A node script to run or generate rsync scripts for backups.

## Installation

```
$ npm i -g rsync-generator
```

## Usage

`rsync-generator` requires a `~/.config/backup/settings.json` file to know what to do.

Once that's in place, run `rsync-generator` from a command line to either run rsync in realtime or to generate an executable bash script.

If you make changes to the config, you will need to run `rsync-generator` again.

## Configuration

The `~/.config/backup/settings.json` file can have the following options.

Example:

```
{
    "destination": "backup-server.io/",
    "exclude": [
        ".DS_Store",
        "node_modules"
    ],
    "output": "/run.sh",
    "sources": [
        "/path/to/directory",
        "/path/to/some.file"
    ]
}
```

### sources

> array (required)

Specifies the resources files and directories to process.

### destination

> string (required)

Specifies the destination of where to rsync resources to.

Note: `rsync-generator` creates a directory at the destination with the computer name, allowing multiple computers to be backed up to the same destination.

### excludes

> array (optional)

A list of files and / or folders to ignore while syncing, ie. `.DS_Store`, `node_modules`, etc., if specified.

### output

> string (optional)

Generates an executable bash script at the specified path.

Example: `/Users/USERNAME/.config/backup/run.sh`

If this isn't specified, `rsync-generator` will run in realtime with command line output.

## Using with macOS for Automated Backups

I thought it might be helpful out outline how I use this package to create automated backups using macOS.

### Choose Backup Destination

You'll need select a destination to sync to. The most common ways are an external hard drive or a host / service.

#### External Hard Drive

This is a fairly common choice for cheap and local backups. The destination in this case would be the file path of the mounted volume once it's plugged into your computer.

#### Host or Service

If you're looking for a bit more more protection and resiliency in your backups (ie. house fire, etc.), you can choose a host or a service. This could be as simple as an S/FTP server with rsync installed or a dedicated service.

I back up to iCloud now, but I used to use a service called [Rsync.net](https://rsync.net). If you wind up going with Rsync.net, you'll want to use their [Generate SSH Keys](https://www.rsync.net/resources/howto/ssh_keys.html) guide to get everything setup and authenticated.

You can use the guide above for many services that use SSH.

### Update Rsync

Unfortunately, macOS ships with an old version of rsync. You'll want to update this for way better performance and newer features.

1. Install [Homebrew](https://brew.sh), if you don't have that already install
1. Then install an updated version of rysnc by running `brew install rsync` from a command line
1. When installation is complete, you'll want to navigate to `/private/etc/paths`, open the file, and ensure `/usr/local/bin` is listed above above `/usr/bin`. This ensures you're running the Homebrew installed version of rsync instead of the version that comes with macOS

### Setup Configuration

1. Create a [configuration as specified above](#usage)
1. You want to [specify an output location](#output). I typically use the same directory as the config, `/Users/USERNAME/.config/backup/run.sh`

### Setup Automation

We're going to create a [launchd](https://www.launchd.info) script. That likely sounds intimidating if you've never done it before, so let's break it down.

#### Create a LaunchAgent

A LaunchAgent is just a fancy Apple word for a scheduled job. We need to create a file that will tell our backup script to run on a given interval.

1. Start by showing hidden files on your Mac by pressing `⌘⇧.` in any Finder window (you can press that same sequence again to hide files)
1. Navigate to `~/Library/LaunchAgents`
1. Create a new file named `backup.plist` in the folder
1. Copy and paste the following into the `backup.plist` file contents

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
    	<key>Label</key>
    	<string>backup</string>
    	<key>EnvironmentVariables</key>
    	<dict>
    		<key>PATH</key>
    		<string>/usr/local/bin:/usr/bin:/bin</string>
    		<key>TERM</key>
    		<string>xterm-color</string>
    	</dict>
    	<key>ProgramArguments</key>
    	<array>
    		<string>/bin/bash</string>
    		<string>/Users/USERNAME/.config/backup/run.sh</string>
    	</array>
    	<key>RunAtLoad</key>
    	<true/>
    	<key>StartInterval</key>
    	<integer>INTERVAL</integer>
    	<key>StandardOutPath</key>
    	<string>/Users/USERNAME/.config/backup/status.log</string>
    	<key>StandardErrorPath</key>
    	<string>/Users/USERNAME/.config/backup/status.log</string>
    </dict>
</plist>
```

There are two things you'll need to change in the content above.

1. `USERNAME`: This will be the username you use on your Mac
1. `INTERVAL`: How often you want the backup script to run. This value should be in seconds. So if you want it to backup every 15 minutes, then you would use `900` (ie. 15 minutes \* 60 seconds per minute)

#### Load LaunchAgent

Now that the LaunchAgent is created, we need to queue it up to run. This can be done by either restarting your computer or running the following command, again, replacing `USERNAME` with your own username.

```
launchctl load ~/Library/LaunchAgents/backup.plist
```

> Note: It's not necessary for this guide, but in the event you ever want to unschedule the job, you can delete the `backup.plist` file and either restart your computer or run the following command.
>
> ```
> launchctl unload ~/Library/LaunchAgents/backup.plist
> ```

#### Conclusion

After either of those, backups should start running immediately and then ongoing at your specified interval. You can see how things are going by viewing the `~/.config/backup/status.log` file, [which we specified above](#create-a-launchagent).

#### Additional Resources

The following resources were helpful ing getting everything setup. They're not required reading, but worth mentioning in case anyone wants to dive deeper.

-   [A comprehensive guide to launchd with configuration, troubleshooting, and examples](https://www.launchd.info)
-   [A Simple Launchd Tutorial](https://medium.com/@chetcorcos/a-simple-launchd-tutorial-9fecfcf2dbb3)
-   [Apple Developer Documents - Daemons and Services Programming Guide](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html)

## License

MIT © [Michael Novotny](https://manovotny.com)
