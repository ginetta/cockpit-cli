#!/usr/bin/env node

const meow = require('meow');

const cockpitInit = require('./cockpit-init').cockpitConfig;

const cockpitComponents = require('./cockpit-menu').saveComponents;

const cockpitMenu = require('./cockpit-menu').terminalMenu;

const cli = meow(
  `
Usage
  $ cockpit-cli <options>

Options
  --init, -i  Creates default folders & config template
  --components -c  Saves components.json and copies components data to clipboard

Examples
  $ cockpit-cli --init
  $ cockpit-cli -g
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
        alias: 'c',
        default: false,
      },
      menu: {
        type: 'boolean',
        alias: 'm',
        default: false,
      },
    },
  },
);

if (cli.flags.init) cockpitInit();
if (cli.flags.components) cockpitComponents();
if (cli.flags.menu) cockpitMenu();
