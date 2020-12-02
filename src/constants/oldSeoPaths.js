const oldSeoPaths = {
    TITLE: ["/:title/jobs-in"],
    LOCATION: [
        "/:country/jobs",
        "/:state/:country/jobs",
        "/:city/:state/:country/jobs"
    ],
    MOC: ["/:moc/vet-jobs"],
    FILTERS: [
        "/:filter0/new-jobs",
        "/:filter0/:filter1/new-jobs",
        "/:filter0/:filter1/:filter2/new-jobs"
    ],
    COMPANY: ["/:company/careers"]
}

module.exports = oldSeoPaths