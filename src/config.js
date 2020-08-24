export default {
    buids: [27396],
    sources: {
        search: "solr",
        // search: "google_talent",
        // complete: "google_talent",
        complete: "google_talent",
        commute: "google_talent",
    },
    project_id: "cloudjobsearch-256720",
    tenant_uuid: "bb9d54aa-b8d6-426b-927f-f9cb4b7e8ed1",
    company_uuids: ["f3089179-7876-49f0-a80a-437b8f90924a"],
    force_filters:{
        // google_talent:"(functionalarea=\"Sales\"  OR functionalarea=\"Retail\")",
        // solr:"title_exact:*Sales* OR title_exact:*Retail*"
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
            key: 'state',
            name: "location",
            display: "State",
        },
        {
            key: 'city',
            name: "location",
            display: "City",
        },
        {
            name: "q",
            key: 'title',
            display: "Title",
        },
    ],
}


