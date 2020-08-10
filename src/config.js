export default {
    buids: [27396],
    sources: {
        search: "solr",
        // search: "google_talent",
        complete: "google_talent",
        commute: "google_talent",
    },
    project_id: "cloudjobsearch-256720",
    tenant_uuid: "bb9d54aa-b8d6-426b-927f-f9cb4b7e8ed1",
    company_uuids: ["f3089179-7876-49f0-a80a-437b8f90924a"],
    filters: [
        {
            display: "Functional Area",
            query_param: "functionalarea",
            attributes: {
                google_talent: 'functionalarea'
            },
            // force_filters: ["Sales","Retail"]
        },
        {
            display: "Business Unit",
            query_param: "businessunit",
            attributes: {
                google_talent: "businessunit"
            }
        },
        {
            display: "Position Type",
            query_param: "positiontype",
            // force_filters: ["Full-Time"]
            attributes: {
                google_talent: "positiontype"
            }
        },
        {
            display: "Remote Position",
            query_param: "remoteposition",
            attributes: {
                google_talent: "remoteposition"
            }
            // force_filters: ["Yes"]
        },
        {
            display: "State",
            query_param: "location",
            attributes: {
                google_talent: "state_country",
                solr: "state_short_exact"
            }
            // force_filters: "California"
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
