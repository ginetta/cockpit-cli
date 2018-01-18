# skeleton-parser

This is a parser for [skeleton](https://github.com/ginetta/skeleton) projects that outputs meta-data about the project's source code.

## Example

Given the following file structure:

```
└── src
    ├── elements
    │   ├── colors
    │   │   ├── docs.spec.jade
    │   │   └── style.scss
    │   └── grid
    │       ├── docs.spec.jade
    │       └── style.scss
    └── modules
        ├── bar
        │   ├── definition.yml
        │   ├── docs.spec.jade
        │   ├── script.js
        │   ├── style.scss
        │   └── template.jade
        └── foo
            ├── definition.yml
            ├── docs.spec.jade
            ├── script.js
            ├── style.scss
            └── template.jade
```

It outputs the following:

```js
{
  "elements": {
    "colors": {
      "documentation": "docs.spec.jade",
      "style": "style.scss",
      "path": "test/fixtures/simple/src/elements/colors"
    },
    "grid": {
      "documentation": "docs.spec.jade",
      "style": "style.scss",
      "path": "test/fixtures/simple/src/elements/grid"
    }
  },
  "modules": {
    "bar": {
      "template": "template.jade",
      "definition": { /* content of modules/bar/definition.yml */ },
      "documentation": "docs.spec.jade",
      "script": "script.js",
      "style": "style.scss",
      "path": "test/fixtures/simple/src/modules/bar"
    },
    "foo": {
      "template": "template.jade",
      "definition": { /* content of modules/foo/definition.yml */ },
      "documentation": "docs.spec.jade",
      "script": "script.js",
      "style": "style.scss",
      "path": "test/fixtures/simple/src/modules/foo"
    }
  }
}
```

## Install

`npm install -g skeleton-parser`

## Usage

### Command line

```
> cd <SKELETON_PROJECT_FOLDER>
> skeleton-parser .
```

Note: currently it isn't possible to pass folders with the command line. Skeleton parser will look in `src/elements/` and `src/modules` by convention.

### Node

```js
const skeletonParser = require('skeleton-parser');

const metaData = skeletonParser({
	cwd: SKELETON_PROJECT_FOLDER,
  folders: [ 'elements', 'modules' ],
  yml: false, // Default true
  src: './' // Default './src'
}
)
```
Note: if yml is set as false Skeleton parser will run for definition.js files, if set as true then it will run for definition.yml files.
If your project does not contain a ./src folder then you should use src: '.' otherwise just use the default value.


## Developing

### Useful tasks 

Clone the project and use the following tasks.

- `npm run lint` : lints the project using [xo](https://github.com/sindresorhus/xo)
- `npm run unit` : runs unit tests suite using [ava](https://github.com/avajs/ava)
- `npm run test:tdd` : runs unit tests in watch mode (useful for developing)
- `npm test` : lint and runs unit tests.
- `npm run build` : generates the dist transpiled files.

### Commit messages

This project uses semantic-release for auto-releasing new versions on npm. As such, it is required to follow [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md)'s commit messages format. Following this format guarantees that new versions are automatically updated using the master branch.

#### Patch Commit

```
fix(pencil): stop graphite breaking when too much pressure applied
```

#### Minor Feature Commit

```
feat(pencil): add 'graphiteWidth' option
```

#### Major Breaking Commit

```
perf(pencil): remove graphiteWidth option

BREAKING CHANGE: The graphiteWidth option has been removed. The default graphite width of 10mm is always used for performance reason.
```




