const config =  {
    buids: [19424],
    source: "solr",
    project_id: process.env.GRIDSOME_GOOGLE_TALENT_PROJECT_ID,
    tenant_uuid: process.env.GRIDSOME_GOOGLE_TALENT_TENANT,
    company_uuids: [process.env.GRIDSOME_GOOGLE_TALENT_COMPANY],
    client_events: true, // Should be extracted to a separate config at some point
    num_items: 2,
    featured_jobs: {
        num_items: 10, //number of items per page.
        solr:"reqid:(" +
            ["R-33091", "R-25218"].join(" OR ") +
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
            name: "company",
            display: "Company",
            key:{
                solr: "company",
                google_talent: "employer"
            }
        },
        {
            name: "location",
            key: "city",
            display: "City",
        },
        // {
        //     name: "jobFunctions",
        //     key: "Functions",
        //     display: "Job Functions",
        // },
        // {
        //     name: "jobSchedule",
        //     key: "Schedule",
        //     display: "Job Schedule",
        // },
        // {
        //     name: "jobTitle",
        //     key: "T",
        //     display: "Job Title",
        // },
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
