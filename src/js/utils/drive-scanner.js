var fs = require("fs");

const dirTree = require("directory-tree");

function scanAndCreateJSON(rootFolder) {
    // main code to continue
    const tree = dirTree(rootFolder, { extensions: /\.jpg/, attributes: ["birthtimeMs"] });
    var uniqueId = 1;

    const rootPrefix = rootFolder.replace(/\//g, "_");

    const replacePaths = directory => {
        let filesArray = [];
        let categories = [];
        const filterData = directory => {
            for (var i = 0; i < directory.children.length; i++) {
                var item = directory.children[i];
                var directoryName = directory.name;
                if (item.type === "directory") {
                    filterData(item);
                } else {
                    item.path = item.path;
                    item.uid = rootPrefix + "__" + uniqueId++;
                    item.tags = directoryName;
                    item.birthtimeMs = item.birthtimeMs;
                    categories = directoryName;
                    filesArray.push(item);
                }
            }
        };

        filterData(directory);
        return {
            images: filesArray,
        };
    };
    const fileTree = replacePaths(tree);
    return fileTree;
}
