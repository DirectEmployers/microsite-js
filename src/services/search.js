import axios from "axios"

import mergeWith from "lodash/mergeWith"

import toString from "lodash/toString"
import kebabCase from "lodash/kebabCase"
import clone from "lodash/clone"

import {isDevelopment, blank, humanFriendlyLocation} from "./helpers"

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

export function searchService(input, config) {
    const source = kebabCase(config.source)
    if (isDevelopment() && process.env.GRIDSOME_SKIP_ORIGIN_CHECK_TOKEN) {
        input.originToken = process.env.GRIDSOME_SKIP_ORIGIN_CHECK_TOKEN
    }
    if (process.isClient) {
        input.origin = blank(config.origin)
            ? window.location.hostname
            : config.origin
    }

    return api().get(`${source}/search`, {
        params: input,
    })
}

export function commuteSearchService(input, config) {
    if (isDevelopment() && process.env.GRIDSOME_SKIP_ORIGIN_CHECK_TOKEN) {
        input.originToken = process.env.GRIDSOME_SKIP_ORIGIN_CHECK_TOKEN
    }
    if (process.isClient) {
        input.origin = blank(config.origin)
            ? window.location.hostname
            : config.origin
    }

    return api().get("google-talent/commute", {
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
            if (Array.isArray(queryValue) && paramValue) {
                return [paramValue].concat(queryValue)
            }
            if (queryValue && paramValue) {
                return [queryValue, paramValue]
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
