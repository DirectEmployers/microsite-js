const config = {
    buids: [48303],
    source: "google-talent", //solr or google-talent
    s3Folder: "frontdoor-jobs",
    project_id: process.env.GRIDSOME_GOOGLE_TALENT_PROJECT_ID,
    tenant_uuid: "50a2f592-698d-441c-b163-5ad75e3c957a",
    company_uuids: ["df1a3d01-7456-4083-9f8a-0c4d7bee4e7b"],
    client_events: true, // Should be extracted to a separate config at some point
    num_items: 2,
    featured_jobs: {
        num_items: 10, //number of items per page.
        solr: "reqid:(" + ["R-33091", "R-25218"].join(" OR ") + ")",
    },
    // force_filters: {
    //     solr:"title_exact:*Sales* OR title_exact:*Retail*"
    // },
    filters: [
        {
            name: "jobcategory",
            display: "Career Areas",
            solr_queries: {
                "Operations": 'text:"Operations"',
                "Engineering": 'text:"Engineering"',
                "Sales": 'text:"Sales"',
                "Marketing": 'text:"Marketing"',
                "Product Management": 'text:"Product Management"',
                "Information Technology": 'text:"Information Technology"',
                "Legal": 'text:"Legal"',
                "Communications": 'text:"Communications"',
                "Finance/Accounting": 'text:"Finance" OR "Accounting"',
            },
        },
        {
            name: "location",
            key: "country",
            display: "Country",
        },
        {
            name: "location",
            key: "state",
            display: "State",
        },
        {
            name: "location",
            key: "city",
            display: "City",
        },
        {
            name: "title",
            display: "Job Title",
        },
    ],
}

module.exports = config
