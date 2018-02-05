#!/usr/bin/env node

const fs = require('fs');
const term = require('terminal-kit').terminal;
const execa = require('execa');
const skeletonParser = require('./skeleton-parser');
const cockpitSchema = require('./collection-schemas');

function terminate() {
  term.grabInput(false);
  setTimeout(() => {
    process.exit();
  }, 100);
}

const terminalMenu = () => {
  term.cyan('\nSelect: ');
  const options = {
    cockpit: '💾  Save schemas ',
    skeleton: '📄  Get components fields ',
    exit: '🚪  Exit ',
  };

  term.singleColumnMenu(Object.values(options), (error, response) => {
    term.moveTo(1, 1).eraseLineAfter.green(`${response.selectedText}\n`);
    term.eraseDisplayBelow();
    switch (response.selectedText) {
      case options.cockpit:
        {
          const schemaOptions = {
            all: '💾  All collections ',
            select: '💾  Select a collection ',
            exit: '⬅️  Back  ',
          };

          term.singleColumnMenu(Object.values(schemaOptions), (error, response) => {
            term.moveTo(1, 1).eraseLineAfter.green(`${response.selectedText}\n`);
            term.eraseDisplayBelow();
            switch (response.selectedText) {
              case schemaOptions.all: {
                cockpitSchema.getAllCollectionsSchemas();
                term.eraseDisplayBelow();
                term.eraseLineAfter();
                term.cyan.yellow('Saved schemas at: \n ./cockpit/schemas\n');
                terminalMenu();
                break;
              }
              case schemaOptions.select: {
                cockpitSchema.listCollections().then(collections =>
                  term.singleColumnMenu(collections, (error, response) => {
                    term.moveTo(1, 1).eraseLineAfter.green(`${response.selectedText}\n`);
                    term.eraseDisplayBelow();
                    for (const collection of collections) {
                      switch (response.selectedText) {
                        case collection: {
                          cockpitSchema.getCollectionSchema(collection);
                          term.eraseDisplayBelow();
                          term.eraseLineAfter();
                          term.cyan.yellow(`Saved ${collection} at: \n ./cockpit/schemas/${collection}.json\n`);
                          terminalMenu();
                          break;
                        }
                        default: {
                          term.eraseDisplayBelow();
                          term.eraseLineAfter();
                          break;
                        }
                      }
                    }
                  }));

                break;
              }
              default:
                terminalMenu();
            }
          });
        }

        break;

      case options.skeleton: {
        term.cyan('\nSelect one of the options: ');
        const menu = {
          all: '✂️  All ',
          groups: '✂️  Groups ',
          save: '💾  Save File ',
          exit: '⬅️  Back ',
        };

        term.singleColumnMenu(Object.values(menu), (error, response) => {
          skeletonParser.get().then((skeleton) => {
            term.moveTo(1, 1).eraseLineAfter.green(`${response.selectedText}\n`);
            term.eraseDisplayBelow();
            switch (response.selectedText) {
              case menu.all: {
                execa.shell(`echo '${JSON.stringify(skeleton, null, '  ')}'| pbcopy`).then(() => {
                  term.cyan.yellow('\nCopied to clipboard\n');
                  term.eraseDisplayBelow();
                  term.eraseLineAfter();
                  terminalMenu();
                });

                break;
              }
              case menu.groups: {
                const skeletonGroups = skeletonParser.selectSkeletonGroup(skeleton);
                term.singleColumnMenu(skeletonGroups, (error, response) => {
                  term.moveTo(1, 1).eraseLineAfter.green(`${response.selectedText}\n`);
                  term.eraseDisplayBelow();

                  for (const group of skeletonGroups) {
                    switch (response.selectedText) {
                      case group: {
                        skeletonParser.copyGroupDataToClipboard(group, skeleton);
                        term.cyan.yellow('\nCopied to clipboard\n');
                        term.eraseDisplayBelow();
                        term.eraseLineAfter();
                        terminalMenu();
                        break;
                      }

                      default: {
                        term.eraseDisplayBelow();
                        term.eraseLineAfter();
                        break;
                      }
                    }
                  }
                });

                break;
              }
              case menu.save:
                {
                  const filePath = './cockpit/components.json';
                  fs.writeFile(filePath, JSON.stringify(skeleton, null, '  '), (err) => {
                    if (err) throw err;
                    term.cyan.yellow(`File created at:\n${filePath}\n`);
                    term.eraseDisplayBelow();
                    term.eraseLineAfter();
                    execa.shell(`echo '${JSON.stringify(skeleton, null, '  ')}'| pbcopy`);
                    return terminalMenu();
                  });
                }
                break;

              default: {
                terminalMenu();
                break;
              }
            }
          });
        });
        break;
      }
      default: {
        terminate();
      }
    }
  });
  term.on('key', (name) => {
    if (name === 'CTRL_C') {
      terminate();
    }
  });
};

const saveComponents = () => {
  const filePath = './cockpit/components.json';
  skeletonParser.get().then(skeleton =>
    fs.writeFile(filePath, JSON.stringify(skeleton, null, ' '), (saveErr) => {
      if (saveErr) throw saveErr;

      return execa
        .shell(`echo '${JSON.stringify(skeleton, null, '  ')}'| pbcopy`)
        .then(() => process.exit());
    }));
};

module.exports = { terminalMenu, saveComponents };
