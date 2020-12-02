const oldSeoPaths = {
    TITLE: ["/:title/jobs-in"],
    LOCATION: [
        "/:country/jobs",
        "/:state/:country/jobs",
        "/:city/:state/:country/jobs"
    ],
    MOC: ["/:moc/vet-jobs"],
    FILTERS: [
        "/:filter/new-jobs",
        "/:filter/:filter/new-jobs",
        "/:filter/:filter/:filter/new-jobs"
    ],
    COMPANY: ["/:company/careers"]
}

module.exports = oldSeoPaths