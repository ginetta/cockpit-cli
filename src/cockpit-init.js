#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configCopyPath = path.resolve(__dirname, './config.js');

const configContent = fs.readFileSync(configCopyPath, 'utf8');

const cocpkpitInit = () => {
  fs.access('./cockpit', (err) => {
    if (!err) return;

    return fs.access('./cockpit/config.js', (err) => {
      if (!err) return;

      return fs.mkdir('./cockpit', (err) => {
        fs.writeFile('./cockpit/config.js', configContent, (err) => {});
      });
    });
  });
};

module.exports = cocpkpitInit;
