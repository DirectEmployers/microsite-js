import api from "./search"
// import config from "~/config"
import { trim, trimEnd, isArray, get, kebabCase } from "lodash"

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

export function commuteSearch(params = {}) {
    return api()
        .get("commute", { params })
        .then(response => {
            return response.data
        })
}

export function removeCountry(location, countries = ["USA", "CAN"]) {
    location = trim(location)

    let i
    let total = countries.length

    for (i = 0; i < total; i++) {
        if (location.endsWith(countries[i])) {
            location = trimEnd(location, countries[i])
            break
        }
    }

    return trimEnd(trim(location), ",")
}

export function cleanLocation(value) {
    value = trim(removeCountry(value))

    const code = value.toUpperCase()

    if (Object.prototype.hasOwnProperty.call(states,code)) {
        value = states[code]
    }

    //todo provinces?

    return value
}

export function completeTitles(params = {}) {
    return api()
        .get("complete", { params })
        .then(response => {
            return response
        })
}

export function getCustomAttribute(job, attribute) {
    const value = get(job, `customAttributes.${attribute}.stringValues`)

    return isArray(value) ? value.join(" ") : value
}

export function getLocation(job) {
    return getCustomAttribute(job, "city_admin1_country")
}

export function getDetailUrl(job) {
    const location = getLocation(job)

    const locationSlug = kebabCase(removeCountry(location))

    const titleSlug = kebabCase(job.title)

    return `/${locationSlug}/${titleSlug}/${job.requisitionId}/job/`
}

export async function similarJobs(title, location, limit = 12) {
    try {

        let { jobs } = await searchJobs({
            config: config,
            data: {
                title,
                location,
                sort: "relevance",
            },
        })

        let currentUrl = ""

        if (process.isClient) {
            currentUrl = window.location.pathname
        }

        return jobs
            .filter(job => {
                return currentUrl !== getDetailUrl(job.job)
            })
            .slice(0, limit)
    } catch (err) {
        return []
    }
}
