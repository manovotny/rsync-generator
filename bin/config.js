var args = require('./arguments'),
    fs = require('fs'),
    validate = require('./validate'),

    config = JSON.parse(fs.readFileSync(args.config, 'utf8'));

validate.config(config);

module.exports = config;