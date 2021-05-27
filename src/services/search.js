import axios from "axios"

import mergeWith from "lodash/mergeWith"

import toString from "lodash/toString"
import kebabCase from "lodash/kebabCase"
import clone from "lodash/clone"

import {isDevelopment, blank, humanFriendlyLocation, slugify} from "./helpers"

export const SOLR = "solr"
export const GOOGLE_TALENT = "google_talent"
let API_URL = "https://qc-search-api.jobsyn.org/api/v1/"

if (process.env.GRIDSOME_USE_MINIKUBE === "true") {
    API_URL = "http://minikube:35000/api/v1"
} else if (!isDevelopment()) {
    API_URL = "https://prod-search-api.jobsyn.org/api/v1/"
}

export function api() {
    return axios.create({
        baseURL: API_URL,
        withCredentials: false,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
}

function apiService(input, config, endpoint) {
    const localHosts = ['localhost', 'minikube']
    if (!process.isClient || isDevelopment() || localHosts.includes(window.location.hostname)) {
        return api().post(endpoint, {
            data: input,
            config: config,
        })
    }
    input.origin = window.location.hostname
    return api().get(endpoint, {
        params: input,
    })
}

export function searchService(input, config) {
    const source = kebabCase(config.source)
    return apiService(input, config, `${source}/search`)
}

export function jobsSearchService(input, config) {
    const source = kebabCase(config.source)
    return apiService(input, config, `${source}/jobs`)
}

export function filtersSearchService(input, config) {
    const source = kebabCase(config.source)
    return apiService(input, config, `${source}/filters`)
}

export function commuteSearchService(input, config) {
    return apiService(input, config, "google-talent/commute")
}

async function autoCompleteService(endpoint, q, queryParams = {}) {
    let params = {
        q,
        ...queryParams,
    }
    try {
        const response = await api().get(endpoint, {
            params,
        })
        return response
    } catch (error) {
        if (Object.prototype.hasOwnProperty.call(error, "response")) {
            return error
        }
        throw new Error(error)
    }
}

export class TitleCompleteService {
    static get(q, queryParams = {}) {
        return autoCompleteService("complete/title", q, queryParams)
    }
}

export class MOCCompleteService {
    static get(q) {
        return autoCompleteService("/complete/moc", q)
    }
}

export class LocationCompleteService {
    static get(q) {
        return autoCompleteService("complete/location", q)
    }
}

/**
 * Parse search url query/route params and format them.
 */
export function parseRouteSearchInput(route) {
    //merge the route data
    let input = mergeWith(
        clone(route.query),
        clone(route.params),
        (queryValue, paramValue) => {
            if (paramValue && queryValue) {
                if (Array.isArray(queryValue)) {
                    return [paramValue].concat(queryValue)
                } else if (slugify(queryValue) != slugify(paramValue)) {
                    return [paramValue, queryValue]
                }
            }
        }
    )
    // handle old url location.
    if (blank(input.location)) {
        input.location = toString(
            [input.city, input.state, input.country].join(" ")
        )
    }
    if (!Array.isArray(input.location)) {
        input.location = humanFriendlyLocation(input.location)
    } else {
        input.location = input.location.map(loc => humanFriendlyLocation(loc))
    }
    return input
}
