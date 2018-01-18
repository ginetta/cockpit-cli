module.exports = {
	elements: {
		colors: {
			documentation: 'docs.spec.jade',
			style: 'style.scss',
			path: 'fixtures/simple/src/elements/colors'
		},
		grid: {
			documentation: 'docs.spec.jade',
			style: 'style.scss',
			path: 'fixtures/simple/src/elements/grid'
		}
	},
	modules: {
		bar: {
			template: 'template.jade',
			definition: {
				data: {
					arg1: 'ads',
					arg2: 'asd'
				},
				options: {
					opt1: ['op1-defaul', 'op1-other'],
					opt2: ['op2-defaul', 'op2-other']
				}
			},
			documentation: 'docs.spec.jade',
			script: 'script.js',
			style: 'style.scss',
			path: 'fixtures/simple/src/modules/bar'
		},
		foo: {
			template: 'template.jade',
			definition: {
				data: {
					arg1: 'ads',
					arg2: 'asd'
				},
				options: {
					opt1: ['op1-defaul', 'op1-other'],
					opt2: ['op2-defaul', 'op2-other']
				}
			},
			documentation: 'docs.spec.jade',
			script: 'script.js',
			style: 'style.scss',
			path: 'fixtures/simple/src/modules/foo'
		}
	}
};
