import {
    trim,
    trimEnd
} from "lodash"
import {
    blank
} from "./helpers"

export let states = {
    AK: "Alaska",
    AL: "Alabama",
    AZ: "Arizona",
    AR: "Arkansas",
    AA: "Armed Forces Americas",
    AE: "Armed Forces Others",
    AP: "Armed Forces Pacific",
    AS: "American Samoa",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DC: "District Of Columbia",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    GU: "Guam",
    HI: "Hawaii",
    IA: "Iowa",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    MA: "Massachusetts",
    MD: "Maryland",
    ME: "Maine",
    MI: "Michigan",
    MN: "Minnesota",
    MO: "Missouri",
    MS: "Mississippi",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    MP: "Northern Mariana Islands",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    PR: "Puerto Rico",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UM: "United States Minor Outlying Islands",
    UT: "Utah",
    VA: "Virginia",
    VI: "Virgin Islands",
    VT: "Vermont",
    WA: "Washington",
    WI: "Wisconsin",
    WV: "West Virginia",
    WY: "Wyoming",
}

export let provinces = {
    AB: "Alberta",
    BC: "British Columbia",
    MB: "Manitoba",
    NB: "New Brunswick",
    NL: "Newfoundland",
    NW: "Northwest Territories",
    NS: "Nova Scotia",
    NU: "Territory of Nunavut",
    ON: "Ontario",
    PE: "Prince Edward Island",
    QC: "Quebec",
    SK: "Saskatchewan",
    YT: "Yukon Territory",
}

export let countries = {
    USA: "United States",
    CAN: "Canada",
}

/**
 * Remove country abbreviation from end of given value.
 */
export function removeCountry(value) {
    if (blank(value)) {
        return value
    }
    let i
    let keys = Object.keys(countries)
    let total = keys.length
    let result = trim(value.toString())

    for (i = 0; i < total; i++) {
        if (result.endsWith(keys[i])) {
            result = trimEnd(result, keys[i])
            break
        }
    }
    return trimEnd(trim(result), ",")
}

/**
 * Remove state abbreviation from end of given value.
 */
export function removeState(value) {
    if (blank(value)) {
        return value
    }
    let i
    let keys = Object.keys(states)
    let total = keys.length
    let result = trim(value.toString())

    for (i = 0; i < total; i++) {
        if (result.endsWith(keys[i])) {
            result = trimEnd(result, keys[i])
            break
        }
    }
    return trimEnd(trim(result), ",")
}

/**
 * Expand a code value to full state name.
 */
export function fullState(code) {
    if (blank(code)) {
        return code
    }
    let result = trim(code.toString())

    if (Object.prototype.hasOwnProperty.call(states, result.toUpperCase())) {
        return states[result.toUpperCase()]
    }

    if (Object.prototype.hasOwnProperty.call(provinces, result.toUpperCase())) {
        return provinces[result.toUpperCase()]
    }

    return result
}

/**
 * Return true if the given value is a code that exists in ONE of
 * the location objects at the top of this module.
 */
 export function isLocationCode(code) {
    let result = trim(code.toString())

    if (Object.prototype.hasOwnProperty.call(states, result.toUpperCase())) {
        return true
    }

    if (Object.prototype.hasOwnProperty.call(provinces, result.toUpperCase())) {
        return true
    }
    if (Object.prototype.hasOwnProperty.call(countries, result.toUpperCase())) {
        return true
    }

    return false
}