import { trim, trimEnd } from "lodash"

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
    MP: "Northern mariana Islands",
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

export let countries = {
    USA: "United States",
    CAN: "Canada"
}

/**
 * Remove country abbreviation from end of given value.
 */
export function removeCountry(value) {

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


export function fullState(code){

    code = trim(code)

    if (Object.prototype.hasOwnProperty.call(states, code)) {
        return states[code]
    }

    return code
}
/**
 * Format a location value for search query/filters.
 * Removes country and tries to expand any province
 * code to its full value.
 */
export function format(value) {

    let formatted = trim(removeCountry(value))

    let code = formatted.toUpperCase()

    code = fullState(code)

    return formatted
}


