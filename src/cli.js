#!/usr/bin/env node

const meow = require('meow');

const cockpitInit = require('./cockpit-init');

const cockpitMenu = require('./cockpit-menu.js');

const cli = meow(
  `
Usage
  $ cockpit || cockpit <options>

Options
  --init, -i  Creates default folders & config template
  --get-components -g  Saves and copies components info to clipboard

Examples
  $ cockpit --init
    cockpit --get-components
`,
  {
    flags: {
      init: {
        type: 'boolean',
        alias: 'i',
        default: false,
      },
      components: {
        type: 'boolean',
        alias: 'g',
        default: false,
      },
    },
  },
);

if (cli.flags.init) {
  cockpitInit();
}

if (cli.flags.components) {
  cockpitMenu();
}
