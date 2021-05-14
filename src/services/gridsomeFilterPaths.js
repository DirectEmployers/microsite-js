const _ = require("lodash")
const slugify = require("./slugify")
const alphabeticalOrder = require("./alphabeticalOrder")
const defaultUrlFilters = require("./../constants/defaultFilters.js")
const defaultFilterNames = _.map(defaultUrlFilters, "name")

function buildFilterPages(
    filterGroup,
    filterPaths,
    prevPath = null,
    prevParam = null
) {
    for (let i = 0, len = filterGroup.length; i < len; i++) {
        let path = null
        let param = filterGroup[i].name
        if (param !== prevParam) {
            path = `/${filterGroup[i].slug}/:${param}`
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

function getFilterPaths(filters) {
    let filterPaths = []
    const allFilters = getAllFilters(filters)

    for (let i = 0, len = allFilters.length; i < len; i++) {
        filterPaths = filterPaths.concat(
            buildFilterPages(allFilters.slice(i), filterPaths)
        )
    }

    return filterPaths
}

function getAllFilters(filters) {
    const customFilters = getCustomFilters(filters)
    const defaultFilters = getDefaultFilters(filters)
    const customFilerSlugs = filterSlugArray(customFilters)

    return _.union(defaultFilters, customFilerSlugs)
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
    defaultFilters = defaultFilters.filter(
        filter => defaultFilterNames.includes(filter.name)
    )
    let activeFilterNames = _.map(defaultFilters, "name")
    let activeDefaultFilters = defaultUrlFilters.filter(
        filter => activeFilterNames.includes(filter.name)
    )
    return activeDefaultFilters
}

function filterSlugArray(filters) {
    return filters.map(filter => {
        return {
            name: filter.name,
            slug: slugify(filter.display)
        }
    })
}

module.exports = getFilterPaths
