const fs = require("fs")
const getFilterPaths = require("./src/services/gridsomeFilterPaths")
const getOldSeoPaths = require("./src/services/gridsomeOldSeoPaths")


module.exports = function (api, filters) {
    api.loadSource(async store => {
        store.addMetadata('paginationType', 'simple') //possible options ['simple', 'load', 'page']
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

        let oldSeoPaths = getOldSeoPaths()
        for (let i = 0, len = oldSeoPaths.length; i < len; i++) {
            createPage({
                path: oldSeoPaths[i],
                component: './src/pages/jobs.vue'
            })
        }

        let filterPaths = getFilterPaths()
        for (let i = 0, len = filterPaths.length; i < len; i++) {
            createPage({
                path: filterPaths[i],
                component: './src/pages/jobs.vue'
            })
        }
        createPage({
            path: "/:guid([a-z0-9A-Z]{32,})",
            component: "./src/templates/Job.vue"
        })
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