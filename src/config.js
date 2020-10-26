export default {
    buids: [50611, 50613],
    source: "solr",
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
