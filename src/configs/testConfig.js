const config = {
    buids: [48303],
    source: "solr", //solr or google-talent
    s3Folder: "frontdoor-jobs",
    project_id: process.env.GRIDSOME_GOOGLE_TALENT_PROJECT_ID,
    tenant_uuid: process.env.GRIDSOME_GOOGLE_TALENT_TENANT,
    company_uuids: [process.env.GRIDSOME_GOOGLE_TALENT_COMPANY],
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
        // {
        //     name: "militarybases",
        //     display: "Military Bases",
        //     solr_queries: {
        //         "Joint Base Elmendorf-Richardson": "{!geofilt}&sfield=GeoLocation&pt=61.29214089702885,-149.72793543296942&d=40.2336",
        //         "Joint Base Anacostia-Bolling": "{!geofilt}&sfield=GeoLocation&pt=38.842981875673246,-77.01483923388254&d=40.2336",
        //     },
        // },
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
            key: "country_short",
            display: "Country",
        },
        {
            name: "location",
            key: "state",
            display: "State"
        },
        {
            name: "location",
            key: {
                solr: "city",
                google_talent: "city_display"
            },
            display: "City",
        },
        {
            name: "title",
            display: "Job Title",
        },
    ],
}

module.exports = config