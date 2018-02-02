const execa = require("execa");
const skeletonParser = require("skeleton-parser");

const listSkeletonGroups = skeleton => {
  const groups = new Set();
  Object.keys(skeleton).forEach(key => groups.add(skeleton[key].group));
  return groups;
};

const copyGroupDataToClipboard = (selected, skeleton) => {
  const skeletonKeys = Object.keys(skeleton);
  const skeletonGroupData = {};
  skeletonKeys.forEach(key => {
    if (skeleton[key].group != selected) return;

    skeletonGroupData[key] = { ...skeleton[key] };

    return skeletonGroupData;
  });
  execa.shell(
    "echo '" + JSON.stringify(skeletonGroupData, null, "  ") + "'| pbcopy"
  );
};

const selectSkeletonGroup = skeleton => {
  const skeletonGroupsSet = listSkeletonGroups(skeleton);
  const skeletonGroups = Array.from(skeletonGroupsSet);

  if (!skeletonGroupsSet.size) return;

  return skeletonGroups;
};

async function get() {
  const metaData = await skeletonParser({
    cwd: ".",
    src: ".",
    folders: [
      "components",
      "layouts",
      "materials",
      "elements",
      "meta",
      "pages",
      "scripts"
    ],
    yml: false //Parses .js files instead of .yml
  });
  const skeleton = {};
  const folders = Object.keys(metaData);
  const subFolders = folders.map(containedElement => {
    return Object.keys(metaData[containedElement]);
  });

  folders.map(containedElement =>
    subFolders.map(content => {
      return content.map(container => {
        const payload = metaData[containedElement][container];

        if (!payload) return;

        if (!payload.definition) return;

        skeleton[container] = payload.definition;

        return skeleton;
      });
    })
  );
  return skeleton;
}
module.exports = {
  get,
  listSkeletonGroups,
  copyGroupDataToClipboard,
  selectSkeletonGroup
};
