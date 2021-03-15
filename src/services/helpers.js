import {
    upperFirst,
    toString,
    words
} from "lodash"
import {
    removeCountry
} from "./location"

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

    if (blank(result)) {
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
        return words(toString(string)).reduce(function(result, word, index, original){
            if( word.length <= 3){
                return upperFirst(result + (index !== original.length - 1 ? " " + upperFirst(word) : ", " +  word.toUpperCase()))
            }
            return upperFirst(`${result} ${upperFirst(word)}`)
        })
    }
    return upperFirst(string);
}

export function serializeToFormData(obj, formData, parentKey) {
    let resultData = formData || new FormData()
    let property, formKey

    for (property in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, property)) {
            continue
        }
        formKey = property
        if (parentKey) {
            formKey = parentKey + '[' + property + ']'
        }

        if (
            typeof obj[property] === 'object' &&
            !(obj[property] instanceof File)
        ) {
            resultData = serializeToFormData(
                obj[property],
                resultData,
                property
            )
        } else {
            // if it's a string or a File object
            resultData.append(formKey, obj[property])
        }
    }

    return resultData
}
