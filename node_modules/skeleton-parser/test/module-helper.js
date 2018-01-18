import path from 'path';
import test from 'ava';
import yaml from 'js-yaml';
import fsp from 'fs-promise';
import mh from '../module-helper';

test.beforeEach(t => {
	t.context.projectRoot = 'fixtures/simple/src/';
});

/**
 * ParseTemplate
 */
test('Test that we find a template file in a module', async t => {
	const exampleModule = 'modules/foo';
	const file = await mh.parseTemplate(exampleModule, t.context.projectRoot);
	t.deepEqual(file, 'template.jade', 'Expected to find a template file');
});

test('Test that we find no template in a module', async t => {
	const exampleModule = 'elements/colors';
	const file = await mh.parseTemplate(exampleModule, t.context.projectRoot);
	t.deepEqual(file, undefined, 'Expected not to find a template file');
});

/**
 * parseScript
 */
test('Test that we find a script in a module', async t => {
	const exampleModule = 'modules/foo';
	const file = await mh.parseScript(exampleModule, t.context.projectRoot);
	t.deepEqual(file, 'script.js', 'Expected to find a script file');
});

test('Test that we find no script in a module', async t => {
	const exampleModule = 'elements/colors';
	const file = await mh.parseScript(exampleModule, t.context.projectRoot);
	t.deepEqual(file, undefined, 'Expected not to find a script file');
});

/**
 * parseDocumentation
 */
test('Test that we find a documentation in a module', async t => {
	const exampleModule = 'modules/foo';
	const file = await mh.parseDocumentation(exampleModule, t.context.projectRoot);
	t.deepEqual(file, 'docs.spec.jade', 'Expected to find a script file');
});

test.todo('Test that we find no documentation in a module');

/**
 * parseStyle
 */
test('Test that we find a style file in a module', async t => {
	const exampleModule = 'modules/foo';
	const file = await mh.parseStyle(exampleModule, t.context.projectRoot);
	t.deepEqual(file, 'style.scss', 'Expected to find a style file');
});

test.todo('Test that we find no styles in a module');

/**
 * parseDefinition
 */
test('Test that we find a definition.yml in a module', async t => {
	const exampleModule = 'modules/foo';
	const file = await mh.parseDefinition(exampleModule, t.context.projectRoot);
	const expectedDefinitionFile = await fsp.readFile(path.resolve(t.context.projectRoot, exampleModule, 'definition.yml'), {encoding: 'utf8'});
	const expectedDefinition = yaml.load(expectedDefinitionFile);
	t.deepEqual(file, expectedDefinition, 'Expected to find a definition file');
});

test('Test that we find no definition.yml in a module', async t => {
	const exampleModule = 'elements/colors';
	const file = await mh.parseDefinition(exampleModule, t.context.projectRoot);
	t.deepEqual(file, undefined, 'Expected not to find a definition file');
});

test('Test that we find a definition.js in a module', async t => {
	const exampleModule = 'modules/foo';
	const file = await mh.parseDefinitionJs(exampleModule, t.context.projectRoot);
	const expectedDefinitionFile = path.resolve(t.context.projectRoot, exampleModule, 'definition.js');
	const expectedDefinition = require(expectedDefinitionFile);
	t.deepEqual(file, expectedDefinition, 'Expected to find a definition file');
});

test('Test that we find no definition.js in a module', async t => {
	const exampleModule = 'elements/colors';
	const file = await mh.parseDefinitionJs(exampleModule, t.context.projectRoot);
	t.deepEqual(file, undefined, 'Expected not to find a definition file');
});

/**
 * extractGroup
 */
test('Test that the group is extracted right', t => {
	let exampleModule = 'modules/foo';
	t.deepEqual(mh.extractGroup(exampleModule), 'modules', 'Expected foo as module name');

	exampleModule = 'modules/foo';
	t.deepEqual(mh.extractGroup(exampleModule), 'modules', 'Expected foo as module name');

	exampleModule = 'another/modules/foo';
	t.deepEqual(mh.extractGroup(exampleModule), 'another/modules', 'Expected foo as module name');
});

/**
 * extractName
 */
test('Test that the name is extracted right', t => {
	let exampleModule = 'modules/foo';
	t.deepEqual(mh.extractName(exampleModule), 'foo', 'Expected foo as module name');

	exampleModule = 'modules/foo';
	t.deepEqual(mh.extractName(exampleModule), 'foo', 'Expected foo as module name');

	exampleModule = 'another/modules/foo';
	t.deepEqual(mh.extractName(exampleModule), 'foo', 'Expected foo as module name');
});
