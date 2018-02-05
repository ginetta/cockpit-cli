const CockpitSDK = require('cockpit-sdk').default;
const fs = require('fs');
const path = require('path');

const configPath = path.resolve('.', './cockpit/config.js');
let cockpit = null;

if (fs.existsSync('./cockpit/config.js')) {
  const config = require(configPath);

  cockpit = new CockpitSDK(config);
}

module.exports = cockpit;
