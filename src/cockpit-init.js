#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configCopyPath = path.resolve(__dirname, './config.js');

const configContent = fs.readFileSync(configCopyPath, 'utf8');

const cockpitConfig = () => {
  if (fs.existsSync('./cockpit')) {
    return fs.writeFile('./cockpit/config.js', configContent, (wrErr) => {
      if (wrErr) throw wrErr;

      process.exit();
    });
  }

  return fs.mkdir('./cockpit', (mkErr) => {
    if (mkErr) throw mkErr;

    return fs.writeFile('./cockpit/config.js', configContent, (mkWrErr) => {
      if (mkWrErr) throw mkWrErr;

      process.exit();
    });
  });
};
module.exports = { cockpitConfig };
