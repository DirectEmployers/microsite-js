function alphabeticalOrder(property) {
    return function (a,b) {
        return a[property].localeCompare(b[property]);
    }
}

module.exports = alphabeticalOrder
