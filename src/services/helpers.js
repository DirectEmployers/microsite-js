import {upperFirst, toString, words} from "lodash"
import {removeCountry} from "./location"

/**
 * Check if the given value is "blank".
 */
export function blank(value) {
    let isBlank = false

    if ([undefined, null, NaN, ""].includes(value)) {
        isBlank = true
    } else if (typeof value === "string" && value.trim().length === 0) {
        isBlank = true
    } else if (Array.isArray(value) && value.length == 0) {
        isBlank = true
    } else if (typeof value === "object" && Object.keys(value).length === 0) {
        isBlank = true
    }

    return isBlank
}

/**
 * Run the given function and keep trying if it fails
 * until the max retries are exceeded and return a promise.
 */
export function retry(callback, args = [], max = 5, delay = 100) {
    return new Promise((resolve, reject) => {
        try {
            let result = callback(...args)
            return resolve(result)
        } catch (e) {
            if (max > 0) {
                setTimeout(function() {
                    return retry(callback, args, --max, delay * 2)
                        .then(resolve)
                        .catch(err => {
                            return reject(err)
                        })
                }, delay)
            } else {
                return reject(e)
            }
        }
    })
}

/** Return true if the env is dev. */
export function isDevelopment() {
    if (process.env.NODE_ENV == "development") {
        return true
    }
    return false
}

/**
 * Build a job detail url.
 */
export function buildJobDetailUrl(title, location, guid) {
    let locationSlug = slugify(removeCountry(location))
    let titleSlug = slugify(title)

    if (blank(locationSlug)) {
        locationSlug = "none"
    }

    return `/${locationSlug}/${titleSlug}/${guid}/job/`
}


export function strAfter(subject, search) {
    let result = search === "" ? subject : subject.split(search)[1]

    if(blank(result)){
        return null
    }

    return result
}

const slugify = (string) => (
    words(toString(string).replace(/["\u2019+:+/]/g, ""), /[\w]+/g).reduce((result, word, index) => (
        result + (index ? "-" : "") + word.toLowerCase()
    ), "")
)

export function displayLocationFromSlug(string) {
    if (string.indexOf("-") > -1) {
        return words(toString(string)).reduce((result, word, index, original) => (
            upperFirst(result + (index !== original.length - 1 ? " " + upperFirst(word) : ", " + word.toUpperCase()))
        ))
    }
    return upperFirst(string);
}

// const sortAlphabetically =

// export function sortItemsAlphabetically(items) {
//     return items
// }
