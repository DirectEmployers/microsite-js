const config = {
    buids: [48224],
    source: "solr", //solr or google-talent
    s3Folder: "boeingveterans-directemployers-works",
    project_id: process.env.GRIDSOME_GOOGLE_TALENT_PROJECT_ID,
    tenant_uuid: process.env.GRIDSOME_GOOGLE_TALENT_TENANT,
    company_uuids: [process.env.GRIDSOME_GOOGLE_TALENT_COMPANY],
    client_events: true, // Should be extracted to a separate config at some point
    num_items: 2,
    // featured_jobs: {
    //     num_items: 10, //number of items per page.
    //     solr: "reqid:(" + ["R-33091", "R-25218"].join(" OR ") + ")",
    // },
    // force_filters: {
    //     solr:"title_exact:*Sales* OR title_exact:*Retail*"
    // },
    filters: [
        {
            name: "moc",
            display: "MOC",
        },
        // {
        //     name: "company",
        //     display: "Company",
        //     key: {
        //         solr: "company",
        //         google_talent: "employer"
        //     }
        // },
        {
            name: "schedule",
            key: "schedule",
            display: "Job Schedule",
            solr_queries: {
                "Full-Time": 'text:"Job Schedule: Full-Time"',
                "PRN": 'text:"Job Schedule: PRN"',
                "Part-Time": 'text:"Job Schedule: Part-Time"',
                "Flex": 'text:"Flex"',
            },
        },
        {
            name: "shift",
            display: "Shift",
            solr_queries: {
                Varies: 'text:"Varies"',
                Day: 'text:"Day"',
                Rotating: 'text:"Rotating"',
                Evenings: 'text:"Shift: Evening" OR "- Evening Shift"',
            },
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
            name: "location",
            key: "country_short",
            display: "Country",
        },
        {
            name: "title",
            display: "Job Title",
        },
        {
            display: "Military Bases",
            name: "militarybases",
            key: "militarybases",
            solr_queries: {
                "NG Bergstrom - (Abia)": 'state_short_exact:"TX"',
                "NG Rio Rancho TS": 'state_short_exact:"NM"',
                "NG Helena Aviation RC- AASF- C12": 'state_short_exact:"MT"',
                "Holston Army Ammunition Plant": "state_short_exact:TN",
                "Runkle Stagefield AL": "state_short_exact:AL",
                "Des Moines IAP": "state_short_exact:IA",
                "Forbes Field ANG": "state_short_exact:KS",
                "Volk ANGB": "state_short_exact:WI",
                "Marine Corps Air Station Beaufort": "state_short_exact:SC",
                "Syracuse MCRC": "state_short_exact:New NY",
                "NAVPMOSSP Magna Utah": "state_short_exact:UT",
                "Holtville Carrier LS": "state_short_exact:CA",
                "Naval Base Kitsap – Keyport": "state_short_exact:WA"
            },
        },
    ],
}

module.exports = config
