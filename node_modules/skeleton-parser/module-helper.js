'use strict';

const path = require('path');
const fsp = require('fs-promise');
const yaml = require('js-yaml');

const TYPE_ENTRY_POINTS = {
	TEMPATE: 'template.jade',
	STYLE: 'style.scss',
	SCRIPT: 'script.js',
	DOC: 'docs.spec.jade',
	DEFINITION: 'definition.yml',
	DEFINITION_JS: 'definition.js'
};

function checkFiletypeExists(filename, modulePath, cwd) {
	const searchedFile = path.join(cwd, modulePath, filename);
	return fsp.exists(searchedFile).then(exists => {
		if (exists) {
			return filename;
		}
	});
}

function readFile(cwd, modulePath, file) {
	if (file) {
		const absolutePath = path.resolve(cwd, modulePath, file);
		return fsp.readFile(absolutePath, {encoding: 'utf8'});
	}
	return;
}

module.exports = {
	extractGroup: modulePath => {
		return path.dirname(modulePath);
	},
	extractName: modulePath => {
		return path.basename(modulePath);
	},
	buildPath: (modulePath, cwd) => {
		return path.join(cwd, modulePath);
	},
	parseScript: (modulePath, cwd) => {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.SCRIPT, modulePath, cwd);
	},
	parseStyle: (modulePath, cwd) => {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.STYLE, modulePath, cwd);
	},
	parseTemplate: (modulePath, cwd) => {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.TEMPATE, modulePath, cwd);
	},
	parseDocumentation: (modulePath, cwd) => {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.DOC, modulePath, cwd);
	},
	parseDefinition: (modulePath, cwd) => {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.DEFINITION, modulePath, cwd)
			.then(definitionFile => readFile(cwd, modulePath, definitionFile))
			.then(content => content ? yaml.load(content) : undefined).catch(err => console.log(modulePath, err))
			;
	},
	parseDefinitionJs: (modulePath, cwd) => {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.DEFINITION_JS, modulePath, cwd)
			.then(definitionJsFile => {
				return definitionJsFile ?
					require(path.resolve(cwd, modulePath, definitionJsFile)) :
					undefined;
			})
			.catch(err => console.log(modulePath, err));
	}
};
