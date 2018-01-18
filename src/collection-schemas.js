import CockpitSDK from "cockpit-sdk";
import cockpit from "./index";

import fs from "fs";

const listCollections = () => {
  return cockpit.collectionList();
};

const getAllCollectionsSchemas = () => {
  return cockpit.collectionList().then(collections =>
    collections.map(c =>
      cockpit.collectionSchema(c).then(data =>
        fs.writeFile(
          `./cockpit/schemas/${c}.json`,
          JSON.stringify(data, null, "  "),
          err => {
            if (err)
              return fs.mkdir("./cockpit/schemas", err => {
                if (err) throw err;

                return fs.writeFile(
                  `./cockpit/schemas/${c}.json`,
                  JSON.stringify(data, null, "  "),
                  err => {
                    if (err) throw err;

                    return;
                  }
                );
              });

            return;
          }
        )
      )
    )
  );
};

const getCollectionSchema = collection => {
  return cockpit.collectionSchema(collection).then(data => {
    return fs.writeFile(
      `./cockpit/schemas/${collection}.json`,
      JSON.stringify(data, null, "  "),
      err => {
        if (err)
          return fs.mkdir("./cockpit/schemas", err => {
            if (err) throw err;

            return fs.writeFile(
              `./cockpit/schemas/${collection}.json`,
              JSON.stringify(data, null, "  "),
              err => {
                if (err) throw err;

                return;
              }
            );
          });

        return;
      }
    );
  });
};

export default {
  getAllCollectionsSchemas,
  listCollections,
  getCollectionSchema
};
