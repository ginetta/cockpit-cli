'use strict';

const pickBy = require('lodash.pickby');
const moduleHelper = require('./module-helper');

const FILE_TYPES = [
	'template',
	'definition',
	'documentation',
	'script',
	'style'
];
const PARSER_BY_FILE_TYPE = {
	template: moduleHelper.parseTemplate,
	documentation: moduleHelper.parseDocumentation,
	definition: moduleHelper.parseDefinition,
	script: moduleHelper.parseScript,
	style: moduleHelper.parseStyle
};
module.exports = (modulePath, cwd, yml) => {
	if (!yml) {
		PARSER_BY_FILE_TYPE.definition = moduleHelper.parseDefinitionJs;
	}

	const name = moduleHelper.extractName(modulePath);
	const group = moduleHelper.extractGroup(modulePath);

	const filetypeParsersPromise = FILE_TYPES.map(filetype =>
		PARSER_BY_FILE_TYPE[filetype](modulePath, cwd)
	);

	// wait for all promise of all filetypes to be completed
	return (
		Promise.all(filetypeParsersPromise)
			// convert them to an object
			.then(attributesResult => {
				return FILE_TYPES.reduce((acc, curr, currIdx) => {
					return Object.assign({}, acc, {[curr]: attributesResult[currIdx]});
				}, {});
			})
			// remove falsey values from obj
			.then(moduleObj => pickBy(moduleObj, Boolean))
			// add path
			.then(moduleObj => {
				return Object.assign({}, moduleObj, {
					path: moduleHelper.buildPath(modulePath, cwd)
				});
			})
			.then(moduleObj => {
				return {
					[group]: {
						[name]: moduleObj
					}
				};
			})
	);
};
