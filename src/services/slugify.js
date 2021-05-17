const _ = require("lodash")

function slugify(string){
    return _.words(_.toString(string).replace(/["\u2019+:+/]/g, ""), /[\w]+/g).reduce(
        (result, word, index) =>
            result + (index ? "-" : "") + word.toLowerCase(),
        ""
    )
}

module.exports = slugify