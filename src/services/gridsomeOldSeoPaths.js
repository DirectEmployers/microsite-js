const _ = require("lodash")
const oldSeoPaths = require("./../constants/oldSeoPaths.js")

function buildOldSeoPaths(key, paths, builtPaths, builtKeys) {
    builtPaths = _.union(builtPaths, paths)
    for (const [currentKey, currentPaths] of Object.entries(oldSeoPaths)) {
        if (currentKey !== key && !builtKeys.includes(currentKey)) {
            for (let i = 0, len = currentPaths.length; i < len; i++) {
                for (let j = 0, len = paths.length; j < len; j++) {
                    builtPaths.push(`${paths[j]}${currentPaths[i]}`)
                }
            }
        }
    }
    return builtPaths;
}

function getOldSeoPaths() {
    let builtPaths = []
    let builtKeys = []
    for (const [key, paths] of Object.entries(oldSeoPaths)) {
        builtPaths = _.union(buildOldSeoPaths(key, paths, builtPaths, builtKeys), builtPaths)
        builtKeys.push(key)
    }
    return builtPaths
}


module.exports = getOldSeoPaths