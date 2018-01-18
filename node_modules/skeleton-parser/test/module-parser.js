'use strict';

import path from 'path';
import test from 'ava';
import yaml from 'js-yaml';
import fsp from 'fs-promise';

const mp = require('../module-parser');

test.beforeEach(t => {
	t.context.projectRoot = 'fixtures/simple/src/';
});

/**
 * ParseTemplate
 */
test('Test that we find the right module structure for a full module', async t => {
	const exampleModule = 'modules/foo';
	const yml = true;
	const moduleJSON = await mp(exampleModule, t.context.projectRoot, yml);
	t.deepEqual(moduleJSON.modules.foo.path, 'fixtures/simple/src/modules/foo');
	t.deepEqual(moduleJSON.modules.foo.template, 'template.jade');
	t.deepEqual(moduleJSON.modules.foo.documentation, 'docs.spec.jade');
	t.deepEqual(moduleJSON.modules.foo.script, 'script.js');
	t.deepEqual(moduleJSON.modules.foo.style, 'style.scss');

	const expectedDefinitionFile = await fsp.readFile(path.resolve(t.context.projectRoot, exampleModule, 'definition.yml'), {encoding: 'utf8'});
	const expectedDefinition = yaml.load(expectedDefinitionFile);

	t.deepEqual(moduleJSON.modules.foo.definition, expectedDefinition, 'Expected to find the');
});

test('Test that we find the right module structure for a partial module ', async t => {
	const exampleModule = 'elements/colors';
	const yml = true;
	const moduleJSON = await mp(exampleModule, t.context.projectRoot, yml);

	t.deepEqual(moduleJSON.elements.colors.path, 'fixtures/simple/src/elements/colors');
	t.deepEqual(moduleJSON.elements.colors.template, undefined);
	t.deepEqual(moduleJSON.elements.colors.script, undefined);
	t.deepEqual(moduleJSON.elements.colors.definition, undefined);
	t.deepEqual(moduleJSON.elements.colors.documentation, 'docs.spec.jade');
	t.deepEqual(moduleJSON.elements.colors.style, 'style.scss');
});

test('Test that we find the right module structure for a full module using .js parser', async t => {
	const exampleModule = 'modules/foo';
	const yml = false;
	const moduleJSON = await mp(exampleModule, t.context.projectRoot, yml);
	t.deepEqual(moduleJSON.modules.foo.path, 'fixtures/simple/src/modules/foo');
	t.deepEqual(moduleJSON.modules.foo.template, 'template.jade');
	t.deepEqual(moduleJSON.modules.foo.documentation, 'docs.spec.jade');
	t.deepEqual(moduleJSON.modules.foo.script, 'script.js');
	t.deepEqual(moduleJSON.modules.foo.style, 'style.scss');

	const expectedDefinitionFile = path.resolve(t.context.projectRoot, exampleModule, 'definition.js');
	const expectedDefinition = require(expectedDefinitionFile);

	t.deepEqual(moduleJSON.modules.foo.definition, expectedDefinition, 'Expected to find the');
});

test('Test that we find the right module structure for a partial module using .js parser ', async t => {
	const exampleModule = 'elements/colors';
	const yml = false;
	const moduleJSON = await mp(exampleModule, t.context.projectRoot, yml);

	t.deepEqual(moduleJSON.elements.colors.path, 'fixtures/simple/src/elements/colors');
	t.deepEqual(moduleJSON.elements.colors.template, undefined);
	t.deepEqual(moduleJSON.elements.colors.script, undefined);
	t.deepEqual(moduleJSON.elements.colors.definition, undefined);
	t.deepEqual(moduleJSON.elements.colors.documentation, 'docs.spec.jade');
	t.deepEqual(moduleJSON.elements.colors.style, 'style.scss');
});
