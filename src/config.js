export default {
    // buids: [50611, 50613], //military home depot
    buids: [27396], //hdsupply
    source: "solr",
    project_id: "cloudjobsearch-256720",
    tenant_uuid: "bb9d54aa-b8d6-426b-927f-f9cb4b7e8ed1",
    company_uuids: ["f3089179-7876-49f0-a80a-437b8f90924a"],
    force_filters: {
        // google_talent:"(functionalarea=\"Sales\"  OR functionalarea=\"Retail\")",
        // solr:"title_exact:*Sales* OR title_exact:*Retail*"
    },
    featured_jobs: {
        num_items: 10,
        solr: "reqid:(" +
            [
                "90832BR",
                "90748BR",
                "90747BR",
                "90802BR",
            ].join(" OR ") +
        ")",
    },
    filters: [
        {
            name: "functionalarea",
            display: "Functional Area",
            solr_facets: {
                "Warehouse": 'text:"Functional Area Warehouse" OR text:"Job Post Category Warehouse"',
                "Transportation": 'text:"Functional Area Transportation" OR text:"Job Post Category Transportation"',
                "Sales": 'text:"Functional Area Sales" OR text:"Job Post Category Sales"'
            }
        },
        {
            name: "businessunit",
            display: "Business Unit",
            solr_facets:{
                "Facilities Maintenance" :'text:"Business Unit Facilities Maintenance"',
                "Construction Industrial WC" :'text:"Business Unit Construction Industrial WC"'
            }
        },
        {
            name: "positiontype",
            display: "Position Type",
            solr_facets: {
                "Full-Time": 'text:"Position Type Full-Time"',
                "Part-Time": 'text:"Position Type Part-Time"'
            }
        },
        {
            name: "remoteposition",
            display: "Remote Position",
            solr_facets: {
                "Yes": 'text:"Remote Position? Yes"',
                "No": 'text:"Remote Position? No"'
            },
        },
        {
            key: "moc",
            name: "moc",
            display: "Military Titles",
        },
        {
            key: "state",
            name: "location",
            display: "State",
        },
        {
            key: "city",
            name: "location",
            display: "City",
        },
        {
            name: "q",
            key: "title",
            display: "Title",
        },
    ],
}
