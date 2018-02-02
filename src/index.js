const CockpitSDK = require('cockpit-sdk').default;
const config = require('./config');

const cockpit = new CockpitSDK(config);

module.exports = cockpit;
