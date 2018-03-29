#!/usr/bin/env node

const fs = require('fs');

const config =
  "module.exports = {\n  host: '<HOST>',\n  accessToken: '<ACCESS_TOKEN>'\n};";

const cockpitConfig = () => {
  if (fs.existsSync('./cockpit')) {
    return fs.writeFile('./cockpit/config.js', config, (wrErr) => {
      if (wrErr) throw wrErr;

      process.exit();
    });
  }

  return fs.mkdir('./cockpit', (mkErr) => {
    if (mkErr) throw mkErr;
    return fs.writeFile('./cockpit/config.js', config, (mkWrErr) => {
      if (mkWrErr) throw mkWrErr;

      process.exit();
    });
  });
};
module.exports = { cockpitConfig };
