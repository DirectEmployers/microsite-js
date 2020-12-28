const _ = require("lodash")
const alphabeticalOrder = require("./alphabeticalOrder")
const config = require("./../config.js")
const defaultUrlFilters = require("./../constants/defaultFilters.js")
const defaultFilterNames = _.map(defaultUrlFilters, "name")
const pluralize = require("pluralize")

function buildFilterPages(filterGroup, filterPaths, prevPath = null, prevParam = null) {
    for (let i = 0, len = filterGroup.length; i < len; i++) {
        let path = null
        let param = filterGroup[i].name
        if (param !== prevParam) {
            path = `/${_.kebabCase(pluralize(filterGroup[i].display))}/:${param}`
            if (prevPath) {
                path = `${prevPath}${path}`
            }
            filterPaths.push(`${path}/jobs`)
        }
        if (path) {
            buildFilterPages(filterGroup.slice(i), filterPaths, path, param)
        }
    }
    return filterPaths
}

function getFilterPaths() {
    let filterPaths = []
    let urlFilters = config.filters
    urlFilters = urlFilters.filter(filter => !defaultFilterNames.includes(filter.name))
    urlFilters.sort(alphabeticalOrder("display"))
    urlFilters = _.union(defaultUrlFilters, urlFilters)

    for (let i = 0, len = urlFilters.length; i < len; i++) {
        filterPaths = filterPaths.concat(buildFilterPages(urlFilters.slice(i), filterPaths))
    }

    return filterPaths;
}

module.exports = getFilterPaths
