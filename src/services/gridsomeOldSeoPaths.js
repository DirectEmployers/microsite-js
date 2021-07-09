const _ = require("lodash")
const oldSeoPaths = require("./../constants/oldSeoPaths.js")

function buildOldSeoPath(path, oldPaths, builtPaths = []) {
    for (const [i, paths] of oldPaths.entries()) {
        for (const _path of paths) {
            builtPaths.push(`${path}${_path}`)
            buildOldSeoPath(`${path}${_path}`, oldPaths.slice(i+1), builtPaths)
        }
    }
    return builtPaths
}
function buildOldSeoPaths() {
    let builtPaths = []
    for (const [index, paths] of oldSeoPaths.entries()) {
        for (const path of paths) {
            builtPaths.push(path)
            builtPaths = buildOldSeoPath(path, oldSeoPaths.slice(index+1), builtPaths)
        }
    }
    return builtPaths
}
function getOldSeoPaths() {
    let builtPaths = []
    for (const [index, paths] of oldSeoPaths.entries()) {
        builtPaths = buildOldSeoPaths(index+1, paths, builtPaths)
    }
    return builtPaths
}
module.exports = getOldSeoPaths