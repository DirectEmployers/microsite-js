const _ = require("lodash")
const slugify = require("./slugify")
const alphabeticalOrder = require("./alphabeticalOrder")
const defaultUrlFilters = require("./../constants/defaultFilters.js")
const defaultFilterNames = _.map(defaultUrlFilters, "name")

function getFilterPaths(filters) {
    let filterPaths = []
    let allFilters = getAllFilters(filters)
    const filterGroups = getSubArrays(allFilters.reverse())

    for (let i = 0; i < filterGroups.length; i++) {
        let path = ""
        for (let j = 0; j < filterGroups[i].length; j++) {
            const param = filterGroups[i][j][0]
            const slug = filterGroups[i][j][1]
            path += `/${slug}/:${param}`
        }
        filterPaths.push(`${path}/jobs`)
    }
    return filterPaths
}

function getAllFilters(filters) {
    const customFilters = getCustomFilters(filters)
    const defaultFilters = getDefaultFilters(filters)
    const defaultFilterSlugs = filterSlugArray(defaultFilters)
    const customFilterSlugs = filterSlugArray(customFilters)
    return _.union(defaultFilterSlugs, customFilterSlugs)
}

function getCustomFilters(filters) {
    let customFilters = filters
    customFilters = customFilters.filter(
        filter => !defaultFilterNames.includes(filter.name)
    )
    return customFilters.sort(alphabeticalOrder("display"))
}

function getDefaultFilters(filters) {
    let defaultFilters = filters
    defaultFilters = defaultFilters.filter(filter =>
        defaultFilterNames.includes(filter.name)
    )
    let activeFilterNames = _.map(defaultFilters, "name")
    let activeDefaultFilters = defaultUrlFilters.filter(filter =>
        activeFilterNames.includes(filter.name)
    )

    return activeDefaultFilters
}

function getSubArrays(arr) {
    if (arr.length === 1) {
        return [arr]
    }
    subarr = getSubArrays(arr.slice(1))
    return subarr.concat(
        subarr.map(e => e.concat([arr[0]])),
        [[arr[0]]]
    )
}

function filterSlugArray(filters) {
    return filters.map(filter => {
        return [filter.name, slugify(filter.display)]
    })
}

module.exports = getFilterPaths
