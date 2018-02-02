const CockpitSDK = require('cockpit-sdk').default;
const cockpit = require('./index');

const fs = require('fs');

const listCollections = () => cockpit.collectionList();

const getAllCollectionsSchemas = () =>
  cockpit.collectionList().then(collections =>
    collections.map(c =>
      cockpit.collectionSchema(c).then(data =>
        fs.writeFile(`./cockpit/schemas/${c}.json`, JSON.stringify(data, null, '  '), (err) => {
          if (err) {
            return fs.mkdir('./cockpit/schemas', (err) => {
              if (err) throw err;

              return fs.writeFile(
                `./cockpit/schemas/${c}.json`,
                JSON.stringify(data, null, '  '),
                (err) => {
                  if (err) throw err;
                },
              );
            });
          }
        }))));

const getCollectionSchema = collection =>
  cockpit.collectionSchema(collection).then(data =>
    fs.writeFile(`./cockpit/schemas/${collection}.json`, JSON.stringify(data, null, '  '), (err) => {
      if (err) {
        return fs.mkdir('./cockpit/schemas', (err) => {
          if (err) throw err;

          return fs.writeFile(
            `./cockpit/schemas/${collection}.json`,
            JSON.stringify(data, null, '  '),
            (err) => {
              if (err) throw err;
            },
          );
        });
      }
    }));

module.exports = {
  getAllCollectionsSchemas,
  listCollections,
  getCollectionSchema,
};
