export default {
    buids: [50611, 50613],
    source: "solr",
    project_id: process.env.GRIDSOME_GOOGLE_TALENT_PROJECT_ID,
    tenant_uuid: process.env.GRIDSOME_GOOGLE_TALENT_TENANT,
    company_uuids: [process.env.GRIDSOME_GOOGLE_TALENT_COMPANY],
    filters: [
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
