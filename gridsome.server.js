const fs = require("fs");
const config = require("./src/config.js");
var pluralize = require('pluralize')
const kebabCase = require('lodash.kebabcase')

const sortByDisplay = (a, b) => {
    const displayA = kebabCase(a.display)
    const displayB = kebabCase(b.display)

    let comparison = 0
    if (displayA > displayB) {
        comparison = 1
    } else if (displayA < displayB) {
        comparison = -1
    }
    return comparison
}

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
        createPage({
            path: '/locations/:location/jobs',
            component: './src/pages/jobs.vue'
        })
        let filters = config.filters
        filters.sort(sortByDisplay)

        function buildFilterPages(filterGroup, prevPath = null, prevParam = null) {
            for (let i = 0, len = filterGroup.length; i < len; i++) {
                let path = null
                let param = filterGroup[i].name
                if (param != prevParam && param != 'location' && param != 'q') {
                    path = `/${kebabCase(filterGroup[i].display)}/:${param}`
                    if (prevPath) {
                        path = `${prevPath}${path}`
                    }
                    createPage({
                        path: `${path}/jobs`,
                        component: './src/pages/jobs.vue'
                    })
                    createPage({
                        path: `/locations/:location/${path}/jobs`,
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
        loopOverFilters(filters)
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