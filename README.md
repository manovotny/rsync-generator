# rsync-generator

> A node script to run or generate rsync scripts for backups.

## Install

### NPM

```
$ npm i -g rsync-generator
```

### Yarn

```
$ yarn add -g rsync-generator
```

## Usage

`rsync-generator` requires a `~/.backup/config.json` file to know what to do.

Once that's in place, run `rsync-generator` from a command line and that's it!

## Configuration

The `config.json` file can have the following options.

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

Specifies the destination of where to rsync resouces to.

### excludes

> array (optional)

A list of files and / or folders to ignore while syncing, ie. `.DS_Store`, `node_modules`, etc., if specified.

### output

> string (optional)

Generates an executable bash script at the speified path.

If this isn't specified, `rsync-generator` will run in realtime with command line output.

## License

MIT © [Michael Novotny](https://manovotny.com)
