import axios from "axios"

import mergeWith from "lodash/mergeWith"

import toString from "lodash/toString"
import kebabCase from "lodash/kebabCase"
import clone from "lodash/clone"

import {isDevelopment, blank, humanFriendlyLocation, slugify } from "./helpers"

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

function apiService(input, config, path) {
    const source = kebabCase(config.source)
    const endpoint = `${source}/${path}`
    if (!process.isClient || (isDevelopment()) && window.location.hostname == 'localhost') {
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
    return apiService(input, config, 'search')
}

export function jobsSearchService(input, config) {
    return apiService(input, config, 'jobs')
}

export function filtersSearchService(input, config) {
    return apiService(input, config, 'filters')
}
export function commuteSearchService(input, config) {
    const endpoint = "google-talent/commute"

    if (!process.isClient || (isDevelopment() && window.location.hostname == 'localhost')){
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


export class TitleCompleteService {
    static async get(q, queryParams = {}) {
        let params = {
            q: q,
            ...queryParams,
        }

        try {
            const response = await api().get("complete/title", {
                params: params,
            })
            return response
        } catch (error) {
            if (Object.prototype.hasOwnProperty.call(error, "response")) {
                return error
            }
            throw new Error(error)
        }
    }
}

export class MOCCompleteService {
    static async get(q) {
        try {
            const response = await api().get("/complete/moc", {
                params: {
                    q: q,
                },
            })
            return response
        } catch (error) {
            if (Object.prototype.hasOwnProperty.call(error, "response")) {
                return error
            }
            throw new Error(error)
        }
    }
}

export class LocationCompleteService {
    static async get(q) {
        try {
            const response = await api().get("complete/location", {
                params: {
                    q: q,
                },
            })
            return response
        } catch (error) {
            if (Object.prototype.hasOwnProperty.call(error, "response")) {
                return error
            }
            throw new Error(error)
        }
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
            if(paramValue && queryValue){
                if (Array.isArray(queryValue)) {
                    return [paramValue].concat(queryValue)
                }
                else if (slugify(queryValue) != slugify(paramValue)) {
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
