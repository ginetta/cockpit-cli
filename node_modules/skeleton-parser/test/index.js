import test from 'ava';
import difflet from 'difflet';
import m from '../';
import expected from './expected/_simple';

const diff = difflet({indent: 2});

test('Tests the normal use case', async t => {
	const actual = await m({cwd: './fixtures/simple'});

	t.deepEqual(actual, expected, diff.compare(actual, expected));
});

test('Tests the folder passing use case', async t => {
	const actual = await m({cwd: './fixtures/simple', folders: ['elements']});
	const elementsExpected = {
		elements: expected.elements
	};
	t.deepEqual(actual, elementsExpected, diff.compare(actual, elementsExpected));
});

