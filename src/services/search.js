import axios from "axios"
import kebabCase from "lodash/kebabCase"
import {isDevelopment} from "./helpers"

export const SOLR = "solr"
export const GOOGLE_TALENT = "google_talent"
let API_URL = "https://qc-search-api.jobsyn.org/api/"

if (process.env.GRIDSOME_USE_MINIKUBE === "true") {
    API_URL = "http://search-api.microsites.test/api/"
} else if (!isDevelopment()) {
    API_URL = "https://prod-search-api.jobsyn.org/api/"
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
    return apiService(input, config, `v1/${source}/search`)
}

export function jobsSearchService(input, config) {
    const source = kebabCase(config.source)
    return apiService(input, config, `v1/${source}/jobs`)
}

export function filtersSearchService(input, config) {
    const source = kebabCase(config.source)
    return apiService(input, config, `v1/${source}/filters`)
}

export function filterSearchService(input, config, filter="") {
    const source = kebabCase(config.source)
    return apiService(input, config, `v1/${source}/filter/${filter}`)
}

export function commuteSearchService(input, config) {
    return apiService(input, config, "v1/google-talent/commute")
}

async function autoCompleteService(endpoint, params) {
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
        let params = {
            q,
            ...queryParams,
        }
        return autoCompleteService("v1/complete/title", params)
    }
}

export class MOCCompleteService {
    static get(q) {
        return autoCompleteService("v1/complete/moc", {q})
    }
}

export class MOCV2CompleteService {
    static get(q) {
        return autoCompleteService("v2/complete/moc", {q})
    }
}

export class LocationCompleteService {
    static get(q, queryParams = {}) {
        let params = {
            q,
            ...queryParams,
        }
        return autoCompleteService("v1/complete/location", params)
    }
}
