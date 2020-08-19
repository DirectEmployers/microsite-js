export default {
    buids: [27396],
    sources: {
        search: "solr",
        // search: "google_talent",
        // complete: "google_talent",
        complete: "solr",
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
            display: "Functional Area",
            query_param: "functionalarea",
            attributes: {
                google_talent: 'functionalarea'
            },
            custom_facets: {
                "Warehouse": 'text:"Functional Area Warehouse" OR text:"Job Post Category Warehouse"',
                "Transportation": 'text:"Functional Area Transportation" OR text:"Job Post Category Transportation"',
                "Sales": 'text:"Functional Area Sales" OR text:"Job Post Category Sales"'
            }
        },
        {
            display: "Business Unit",
            query_param: "businessunit",
            custom_facets:{
                "Facilities Maintenance" :'text:"Business Unit Facilities Maintenance"',
                "Construction Industrial WC" :'text:"Business Unit Construction Industrial WC"'
            },
            attributes: {
                google_talent: "businessunit"
            }
        },
        {
            display: "Position Type",
            query_param: "positiontype",
            custom_facets: {
                "Full-Time": 'text:"Position Type Full-Time"',
                "Part-Time": 'text:"Position Type Part-Time"'
            },
            attributes: {
                google_talent: "positiontype"
            }
        },
        {
            display: "Remote Position",
            query_param: "remoteposition",
            custom_facets: {
                "Yes": 'text:"Remote Position? Yes"',
                "No": 'text:"Remote Position? No"'
            },
            attributes: {
                google_talent: "remoteposition"
            }
        },
        {
            display: "State",
            query_param: "location",
            attributes: {
                google_talent: "state_country",
                solr: "state_short_exact"
            }
        },
        {
            display: "City",
            query_param: "location",
            attributes: {
                google_talent: "city_admin1_country",
                solr: "location_exact"
            }
        },
        {
            display: "Title",
            query_param: "q",
            attributes: {
                google_talent: "job_title",
                solr: "title_exact"
            }
        },
    ],
}
