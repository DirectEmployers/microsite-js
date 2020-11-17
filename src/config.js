export default {
    // buids: [50611, 50613],
    buids:[27396],
    source: "google_talent",
    project_id: process.env.GRIDSOME_GOOGLE_TALENT_PROJECT_ID,
    tenant_uuid: process.env.GRIDSOME_GOOGLE_TALENT_TENANT,
    company_uuids: [process.env.GRIDSOME_GOOGLE_TALENT_COMPANY],
    client_events: true,
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
            key: "title",
            name: "q",
            display: "Title",
        },
    ],
}
