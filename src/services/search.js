import axios from "axios"
import {kebabCase} from "lodash"
import { isDevelopment } from "./helpers"

export const SOLR = "solr"
export const GOOGLE_TALENT = "google_talent"
export const TIMEOUT_THRESHOLD = 5000

var API_URL = "https://qc-search-api.jobsyn.org/api/v1/"

if (process.env.GRIDSOME_USE_MINIKUBE === "true") {
    API_URL = "http://minikube:35000/api/v1"
} else if (!isDevelopment()) {
    //update whenever we have a prod version.
    API_URL = "https://qc-search-api.jobsyn.org/api/v1/"
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

export function searchService(input, siteConfig){
    const source = kebabCase(siteConfig.source)

    return api().post(
        `${source}/search`,
        {
            data: input,
            config: siteConfig,
        },
        {
            timeout: TIMEOUT_THRESHOLD
        }
    )
}

export function commuteSearchService(input, siteConfig){
    return api().post(
        `google-talent/commute`,
        {
            data: input,
            config: siteConfig,
        },
        {
            timeout: TIMEOUT_THRESHOLD
        }
    )
}


export class TitleCompleteService {
    static async get(q, siteConfig) {
        const slug = kebabCase(siteConfig.source)
        let params = {q: q, buids: siteConfig.buids}

        if (siteConfig.source == GOOGLE_TALENT) {
            params["project_id"] = siteConfig.project_id
            params["tenant_uuid"] = siteConfig.tenant_uuid
            params["company_uuids"] = siteConfig.company_uuids
        }

        try {
            const response = await api().get(`${slug}/complete/title`, {
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
            const response = await api().get("/solr/complete/location", {
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
