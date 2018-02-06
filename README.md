# Cockpit CLI

### A CLI for [Cockpit Headless CMS](https://github.com/agentejo/cockpit) that uses [Cockpit SDK](https://github.com/ginetta/cockpit-sdk)

* Parses data structures from a project outputing meta-data that can be used directly on Cockpit.

* Gets data from Cockpit collection schemas and components groups to make it easier to manipulate or generate.

## Install

```sh
cd my-app

npm install cockpit-cli
```

### Usage

```sh
cockpit-cli [options]

#For example (--verbose || -v)
cockpit-cli --init, --menu, --components, --help
```

### Configuration

#### $ cockpit-cli --init

When setting up a project run `--init` so that the **CLI** can set up a `/cockpit` folder with a `config.js` file to connect the project to cockpit using [cockpit-sdk](https://github.com/ginetta/cockpit-sdk) .

```javascript
module.exports = {
  host: "<HOST>",
  webSocket: "<WEBSOCKET>",
  accessToken: "<ACCESS_TOKEN>"
};
```

To edit the file at `./cockpit/config.js` :

* Go into Cockpit and access a `collection` edit menu where the tab with the description `Other` should be selected.

* Enable the `CONTENT PREVIEW` option. This is where the `host` and `webSocket` are (or should be), specified by this order.

* Copy the contents of those fields to the `config.js` file. (Note: webSocket field can be ommited).

* The `accessToken` can be retrieved on Cockpit settings page at `API access`. Choose between `Full access API-key` or a `Custom key` but please bear in mind that a `Custom Key` permission level can be restricted in comparison to a `Full access API-key`.
  It's possible to edit the `config.js` file at anytime but if in doubt about which one to choose, please checkout [Cockpit API documentation](https://getcockpit.com/documentation/api/token).

### Structure example

```sh
└── src
    ├── components
    │       ├── footer
    │       │    └──  definition.js
    │       │    └──  index.js
    |       |
    │       └── heading
    │            └──  definition.js
    │            └──  index.js
    |
    └── layouts
            └── bar
                 └──  definition.js
                 └──  index.js

# Or from the root

├── components
|       └── paragraph
|             └──  definition.js
|             └──  index.js
|
└── layouts
        └── bar
              └──  definition.js
              └──  index.js



folders: ['components', 'layouts', 'materials', 'elements', 'meta', 'pages', 'scripts']
```

### Using components as example

`definition.js` files should contain the structure for Cockpit `components` like field names, types and options. Checkout the [Cockpit fieldtypes documentation](https://getcockpit.com/documentation/reference/fieldtypes).

A `paragraph` component could have a `definition.js` file as described:

```javascript
module.exports = {
  group: "test",
  fields: [
    {
      name: "color",
      type: "collectionlink",
      options: {
        link: "Colors"
      }
    },
    {
      name: "text",
      type: "textarea",
      default: ""
    },
    {
      name: "container",
      type: "select",
      options: {
        options: ["medium", "small", "spaceless", "left-aligned"]
      },
      default: ""
    },
    {
      name: "lead",
      type: "boolean",
      default: false
    }
  ]
};
```

The **CLI** parses the content of this file to `.json` and it can separate them in `groups` by detecting if there is a value assigned to the key `group` in the `component/definition.js` file.  
If no groups are specified then all groups are selected and this means all the `definitions.js` files are going to be parsed and it is possible to generate a `cockpit/components.json` file with all the parsed data or copy that data to the clipboard.

### Component groups & Collection schemas

#### $ cockpit-cli --menu

Launches the **CLI** menu where it's possible to:

#### `💾 Save schemas` :

![cli-schemas-menu](https://i.imgur.com/nhn2nrX.png)

* `💾 All collections` creates a folder at `/cockpit/schemas` that contains data from all the schemas in all the collectionss in parsed to `.json` format .

* `💾 Select a collection` creates a folder at `/cockpit/schemas` that contains data from the scheema of the selected collection.

* The `Save` option always overwrites previous folders or files created by the **CLI**.

#### `📄 Get components fields` :

![cli-fields-menu](https://i.imgur.com/5h3RI1Z.png)

* `✂️ All` parses all the `definition.js` files and copies the parsed result to the clipboard.

* `✂️ Groups` launches a new menu where it is possible to select one of the `groups` that are defined in the project data structure `definition.js` and copies the data from the component or components that correspond to the selected `group` to clipboard.

* `💾 Save File` creates a file at `/cockpit/components.json` with all the parsed data from all the `definition.js` files.

* The `Save` option always overwrites previous folders or files created by the **CLI**.

Cockpit has a `core` components structure, this means that when adding a new component there will always be a group of components already pre-defined to which it is possible to add your own.  
The CLI outputs a data structure ready to be added to cockpit `components.js` file.

#### Cockpit `components.js`

* Go to Cockpit
* Access finder
* Select the config folder

The parsed structure by the **CLI** can be pasted here, for example, adding the data of a specific `component group` or overwritting the complete file by pasting the data from all `component groups`.

After the file is saved and when trying to add a new component to a cockpit collection these components that were parsed by the **CLI** should now appear as an option inside their specified `groups`.

#### $ cockpit-cli --components

This simply acts as a shortcut to create the `/cockpit/components.json/` file and to copy the parsed data to the clipboard.
