'use strict';

const globby = require('globby');
const merge = require('lodash.merge');
const moduleParser = require('./module-parser');

const DEFAULT_OPTIONS = {
	cwd: '.',
	folders: ['elements', 'modules'],
	yml: true, // Default option to parse .yml files
	src: 'src'
};

module.exports = function (options = {}) {
	const opts = {...DEFAULT_OPTIONS, ...options};
	const globbyPattern = opts.folders.map(folder => `${folder}/*`);
	const globbyOptions = {cwd: `${opts.cwd}/${opts.src}`};

	return globby(globbyPattern, globbyOptions)
		.then(paths => {
			return paths.map(p => {
				return moduleParser(p, `${globbyOptions.cwd}`, opts.yml);
			});
		})
		.then(allModulesPromise => Promise.all(allModulesPromise))
		.then(mergeArrayOfObjects);
};

function mergeArrayOfObjects(modules) {
	return modules.reduce((acc, cur) => merge(acc, cur), {});
}
