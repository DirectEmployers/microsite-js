const fs = require("fs")
const _ = require('lodash')
const alphabeticalOrder = require("./src/services/alphabeticalOrder")
const config = require("./src/config.js")
const defaultUrlFilters = require("./src/constants/defaultFilters.js")
const defaultFilterNames = _.map(defaultUrlFilters, 'name')
const pluralize = require("pluralize")

let urlFilters = config.filters
urlFilters = urlFilters.filter(filter => !defaultFilterNames.includes(filter.name))
urlFilters.sort(alphabeticalOrder('display'))
urlFilters = _.union(defaultUrlFilters, urlFilters)

module.exports = function (api, filters) {
    api.loadSource(({
        addCollection
    }) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    })
    api.createPages(async ({
        graphql,
        createPage
    }) => {
        createPage({
            path: "/:location/:title/:guid/job",
            component: "./src/templates/Job.vue"
        })
        createPage({
            path: "/:guid/job",
            component: "./src/templates/Job.vue"
        })

        function buildFilterPages(filterGroup, prevPath = null, prevParam = null) {
            for (let i = 0, len = filterGroup.length; i < len; i++) {
                let path = null
                let param = filterGroup[i].name
                if (param !== prevParam) {
                    path = `/${_.kebabCase(pluralize(filterGroup[i].display))}/:${param}`
                    if (prevPath) {
                        path = `${prevPath}${path}`
                    }
                    createPage({
                        path: `${path}/jobs`,
                        component: './src/pages/jobs.vue'
                    })
                }
                if (path) {
                    buildFilterPages(filterGroup.slice(i), path, param)
                }
            }
        }
        function loopOverFilters(filters) {
            for (let i = 0, len = filters.length; i < len; i++) {
                buildFilterPages(filters.slice(i))
            }
        }
        loopOverFilters(urlFilters)
    })

    api.afterBuild(({
        redirects
    }) => {
        const rules = [];
        for (const rule of redirects) {
            const serveRule = {
                source: rule.from,
                destination: rule.to
            }
            rules.push(serveRule)
        }
        const rulesString = JSON.stringify(rules, null, 2)
        console.log(rulesString)
        fs.writeFileSync("rewriteRules.json", rulesString)
    })
}