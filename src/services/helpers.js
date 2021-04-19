import trim from "lodash/trim"
import words from "lodash/words"
import toString from "lodash/toString"
import {removeCountry} from "./location"
import startCase from "lodash/startCase"
import upperFirst from "lodash/upperFirst"

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

const slugify = string =>
    words(toString(string).replace(/["\u2019+:+/]/g, ""), /[\w]+/g).reduce(
        (result, word, index) =>
            result + (index ? "-" : "") + word.toLowerCase(),
        ""
    )

/**
 * https://stackoverflow.com/questions/39842004/why-use-regular-expressions-to-validate-latitude-and-longitude-in-javascript
 */
export function isCoordinates(string) {
    let value = new String(string).split(",")
    if (blank(string)) {
        return false
    }

    let isLat = isFinite(value[0]) && Math.abs(value[0]) <= 90

    let isLng = isFinite(value[1]) && Math.abs(value[1]) <= 180

    return isLat && isLng
}

export function humanFriendlyLocation(string) {
    if (isCoordinates(string)) {
        return string
    }

    let location = trim(toString(string).toLowerCase())

    if (location.length <= 3) {
        return location.toUpperCase()
    }

    let parts = location.split(string.indexOf("-") != -1 ? "-" : " ")

    if (parts.length == 1) {
        return startCase(parts[0])
    }

    return words(parts.join("-")).reduce(function(
        result,
        word,
        index,
        original
    ) {
        if (parts.length <= 3 && word.length <= 3) {
            return upperFirst(`${result}, ${word.toUpperCase()}`)
        }
        return startCase(`${result} ${word}`)
    })
}
