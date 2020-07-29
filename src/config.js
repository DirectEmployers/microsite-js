export default {
    buids: [27396],
    sources: {
        search: "google-talent",
        complete: "google-talent",
        commute: "google-talent",
    },
    project_id: "cloudjobsearch-256720",
    tenant_uuid: "bb9d54aa-b8d6-426b-927f-f9cb4b7e8ed1",
    company_uuids: ["f3089179-7876-49f0-a80a-437b8f90924a"],
    filters: [
        {
            display: "Functional Area",
            query_param: "functionalarea",
            key: "functionalarea",
            // force_filters: ["Sales","Retail"]
        },
        {
            display: "Business Unit",
            query_param: "businessunit",
            key: "businessunit",
        },
        {
            display: "Position Type",
            query_param: "positiontype",
            key: "positiontype",
            // force_filters: ["Full-Time"]
        },
        {
            display: "Remote Position",
            query_param: "remoteposition",
            key: "remoteposition",
            // force_filters: ["Yes"]
        },
        {
            display: "State",
            query_param: "location",
            key: "state_country",
            // force_filters: "California"
        },
        {
            display: "City",
            query_param: "location",
            key: "city_admin1_country",
        },
        {
            display: "Title",
            query_param: "q",
            key: "job_title",
        },
    ],
}
