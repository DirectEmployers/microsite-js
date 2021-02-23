import axios from "axios"
import {
    kebabCase
} from "lodash"
import {
    isDevelopment
} from "./helpers"

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

export function searchService(input, siteConfig) {
    const source = kebabCase(siteConfig.source)

    return api().post(
        `${source}/search`, {
            data: input,
            config: siteConfig,
        }
    )
}

export function commuteSearchService(input, siteConfig) {
    return api().post(
        `google-talent/commute`, {
            data: input,
            config: siteConfig,
        }
    )
}


export class TitleCompleteService {
    static async get(q, queryParams = {}) {
        let params = {
            q: q,
            ...queryParams
        }

        try {
            const response = await api().get("complete/title", {
                params: params,
                timeout: TIMEOUT_THRESHOLD,
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
                timeout: TIMEOUT_THRESHOLD,
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
                timeout: TIMEOUT_THRESHOLD,
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