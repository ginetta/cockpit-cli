#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const configCopyPath = path.resolve(__dirname, "./config.js");
console.log(configCopyPath);
console.log("2.1");
const configContent = fs.readFileSync(configCopyPath, "utf8");
console.log("2.2", configContent);
const cocpkpitInit = () => {
  console.log("init is about to run bruv");
  fs.access("./cockpit", err => {
    console.log("2.3 error", err);
    if (!err) return;
    console.log("2.3");

    return fs.access("./cockpit/config.js", err => {
      if (!err) return;
      console.log("2.4");

      return fs.mkdir("./cockpit", err => {
        if (err) return console.log(err);
        console.log("2.5");

        fs.writeFile("./cockpit/config.js", configContent, err => {
          if (err) return console.log(err);
          console.log("2.6");
        });
      });
    });
  });
};

module.exports = cocpkpitInit;
