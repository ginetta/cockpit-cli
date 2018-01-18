#!/usr/bin/env node
'use strict';
const meow = require('meow');
const skeletonParser = require('./');

const cli = meow({
	help: [
		'Usage',
		'  skeleton-parser folder [options]',
		'',
		'Example',
		'  skeleton-parser .',
		''
		// 'Options',
		// '  --verbose      Detailed summary.',
	]
});

if (!cli.input[0]) {
	console.error('Please supply a folder path');
	process.exit(1);
}

const options = Object.assign(
	{},
	{cwd: cli.input[0]},
	cli.flags
);

skeletonParser(options)
	.then(result => {
		console.log(JSON.stringify(result, undefined, 2));
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});
