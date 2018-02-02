#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const terminal = require('terminal-kit').terminal;
const execa = require('execa');
const skeletonParser = require('./skeleton-parser');
const cockpitSchema = require('./collection-schemas');

const terminalMenu = () => {
  terminal.cyan('\nSelect: ');
  const options = {
    cockpit: '💾  Save schemas ',
    skeleton: '📄  Get components fields ',
    exit: '🚪  Exit ',
  };

  terminal.singleColumnMenu(Object.values(options), (error, response) => {
    terminal.moveTo(1, 1).eraseLineAfter.green(`${response.selectedText}\n`);
    terminal.eraseDisplayBelow();
    switch (response.selectedText) {
      case options.cockpit:
        const schemaOptions = {
          all: '💾  All collections ',
          select: '💾  Select a collection ',
          exit: '⬅️  Back  ',
        };
        terminal.singleColumnMenu(Object.values(schemaOptions), (
          error,
          response,
        ) => {
          terminal
            .moveTo(1, 1)
            .eraseLineAfter.green(`${response.selectedText}\n`);
          terminal.eraseDisplayBelow();
          switch (response.selectedText) {
            case schemaOptions.all:
              cockpitSchema.getAllCollectionsSchemas();
              terminal.eraseDisplayBelow();
              terminal.eraseLineAfter();
              terminal.cyan.yellow('Saved schemas at: \n ./cockpit/schemas\n');
              terminalMenu();
              break;

            case schemaOptions.select:
              collectionSchemas.listCollections().then(collections =>
                terminal.singleColumnMenu(collections, (
                  error,
                  response,
                ) => {
                  terminal
                    .moveTo(1, 1)
                    .eraseLineAfter.green(`${response.selectedText}\n`);
                  terminal.eraseDisplayBelow();
                  for (const collection of collections) {
                    switch (response.selectedText) {
                      case collection:
                        cockpitSchema.getCollectionSchema(collection);
                        terminal.eraseDisplayBelow();
                        terminal.eraseLineAfter();
                        terminal.cyan.yellow(`Saved ${collection} at: \n ./cockpit/schemas/${collection}.json\n`);
                        terminalMenu();
                        break;
                    }
                  }
                }));
              break;
            default:
              terminalMenu();
          }
        });

        break;

      case options.skeleton:
        terminal.cyan('\nSelect one of the options: ');
        const menu = {
          all: '✂️  All ',
          groups: '✂️  Groups ',
          save: '💾  Save File ',
          exit: '⬅️  Back ',
        };

        terminal.singleColumnMenu(Object.values(menu), (
          error,
          response,
        ) => {
          skeletonParser.get().then((skeleton) => {
            terminal
              .moveTo(1, 1)
              .eraseLineAfter.green(`${response.selectedText}\n`);
            terminal.eraseDisplayBelow();
            switch (response.selectedText) {
              case menu.all:
                execa
                  .shell(`echo '${
                    JSON.stringify(skeleton, null, '  ')
                  }'| pbcopy`)
                  .then((result) => {
                    terminal.cyan.yellow('\nCopied to clipboard\n');
                    terminal.eraseDisplayBelow();
                    terminal.eraseLineAfter();
                    terminalMenu();
                  });

                break;

              case menu.groups:
                const skeletonGroups = skeletonParser.selectSkeletonGroup(skeleton);
                terminal.singleColumnMenu(skeletonGroups, (
                  error,
                  response,
                ) => {
                  terminal
                    .moveTo(1, 1)
                    .eraseLineAfter.green(`${response.selectedText}\n`);
                  terminal.eraseDisplayBelow();

                  for (const group of skeletonGroups) {
                    switch (response.selectedText) {
                      case group:
                        skeletonParser.copyGroupDataToClipboard(
                          group,
                          skeleton,
                        );
                        terminal.cyan.yellow('\nCopied to clipboard\n');
                        terminal.eraseDisplayBelow();
                        terminal.eraseLineAfter();
                        terminalMenu();
                        break;
                    }
                  }
                });

                break;

              case menu.save:
                const filePath = './cockpit/components.json';
                fs.writeFile(
                  filePath,
                  JSON.stringify(skeleton, null, '  '),
                  (err) => {
                    if (err) throw err;
                    terminal.cyan.yellow(`File created at:\n${filePath}\n`);
                    terminal.eraseDisplayBelow();
                    terminal.eraseLineAfter();
                    execa.shell(`echo '${
                      JSON.stringify(skeleton, null, '  ')
                    }'| pbcopy`);
                    return terminalMenu();
                  },
                );

                break;

              default:
                terminalMenu();
                break;
            }
          });
        });
        break;
      default:
        terminate();
    }
  });
  terminal.on('key', (name, matches, data) => {
    if (name === 'CTRL_C') {
      terminate();
    }
  });

  function terminate() {
    terminal.grabInput(false);
    setTimeout(() => {
      process.exit();
    }, 100);
  }
};

module.exports = terminalMenu;
