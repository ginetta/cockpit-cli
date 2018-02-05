const CockpitSDK = require('cockpit-sdk').default;
const fs = require('fs');

let cockpit = null;

if (fs.existsSync('./cockpit/config.js')) {
  const config = require(__dirname, './cockpit/config.js');
  cockpit = new CockpitSDK(config);
}

module.exports = cockpit;
