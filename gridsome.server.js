const fs = require("fs")
const getFilterPaths = require("./src/services/gridsomeFilterPaths")

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

        let filterPaths = getFilterPaths()
        for (let i = 0, len = filterPaths.length; i < len; i++) {
            createPage({
                path: filterPaths[i],
                component: './src/pages/jobs.vue'
            })
        }
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