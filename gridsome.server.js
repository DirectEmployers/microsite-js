const fs = require("fs");

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
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