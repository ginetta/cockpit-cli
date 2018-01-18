#!/usr/bin/env node

import fs from "fs";

const configContent = fs.readFileSync("./src/config.tpl.js");

const cockpitSDKContent = fs.readFileSync("./src/index.js");

fs.access("./cockpit", err => {
  if (!err) return;

  return fs.mkdir("./cockpit", err => {
    if (err) return console.log(err);

    fs.writeFile("./cockpit/config.js", configContent, err => {
      if (err) return console.log(err);

      return fs.writeFile("./cockpit/index.js", cockpitSDKContent, err => {
        if (err) return console.log(err);
        return;
      });
    });
  });
});
