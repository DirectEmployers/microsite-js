const config =  {
    // buids: [50611, 50613],
    buids:[19424],
    source: "solr",
    project_id: process.env.GRIDSOME_GOOGLE_TALENT_PROJECT_ID,
    tenant_uuid: process.env.GRIDSOME_GOOGLE_TALENT_TENANT,
    company_uuids: [process.env.GRIDSOME_GOOGLE_TALENT_COMPANY],
    client_events: true,
    featured_jobs: {
        num_items: 10, //number of items per page.
        solr:"reqid:(" +
            ["R-31630", "R-31837"].join(" OR ") +
        ")",
    },
    // force_filters: {
    //     solr:"title_exact:*Sales* OR title_exact:*Retail*"
    // },
    filters: [
        {
            name: "moc",
            display: "MOC",
        },
        {
            name: "location",
            key: "city",
            display: "City",
        },
        {
            name: "location",
            key: "state",
            display: "State"
        },
        {
            name: "location",
            key: "country",
            display: "Country",
        },
        {
            name: "title",
            display: "Title",
        },
        {
            name: "shift",
            display: "Shift",
            solr_queries: {
                Varies:'text:"Varies"',
                Day:'text:"Day"',
                Rotating:'text:"Rotating"',
            },
        },
        {
            name: "business-unit",
            display: "Business Unit",
        }
    ],
}

module.exports = config
