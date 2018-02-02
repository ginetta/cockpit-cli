#!/usr/bin/env node

const meow = require("meow");
console.log("1");
const cockpitCli = require(".");
console.log("2");
const cockpitInit = require("./cockpit-init");

// console.log("3");
const cockpitMenu = require("./cockpit-menu.js");
// console.log("4");

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
        type: "boolean",
        alias: "i",
        default: false
      },
      components: {
        type: "boolean",
        alias: "g",
        default: false
      }
    }
  }
);

console.log("meow parsed command with", cli);
if (cli.flags.init) {
  cockpitInit();
}

if (cli.flags.components) {
  cockpitMenu();
}

// cockpitCli(cli.input[0], cli.flags);
