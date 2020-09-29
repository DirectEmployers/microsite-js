import axios from "axios"
import {kebabCase} from "lodash"

const TIMEOUT_THRESHOLD = 5000
const SOLR = "solr"
const GOOGLE_TALENT = "google_talent"
export default function api() {
    return axios.create({
        baseURL: process.env.GRIDSOME_API_URL,
        withCredentials: false,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
}

export class SearchService {
    static async get(input, siteConfig) {
        const source = kebabCase(siteConfig.source)

        try {
            let response = await api().post(
                `${source}/search`,
                {
                    data: input,
                    config: siteConfig,
                },
                {timeout: TIMEOUT_THRESHOLD}
            )

            return response
        } catch (error) {
            if (Object.prototype.hasOwnProperty.call(error, "response")) {
                return error
            }
            throw new Error(error)
        }
    }
}

export class CommuteSearchService {
    static async get(input, siteConfig) {
        const source = kebabCase(siteConfig.source)

        try {
            let response = await api().post(
                `${source}/commute`,
                {
                    data: input,
                    config: siteConfig,
                },
                {timeout: TIMEOUT_THRESHOLD}
            )
            return response
        } catch (error) {
            if (Object.prototype.hasOwnProperty.call(error, "response")) {
                return error
            }
            throw new Error(error)
        }
    }
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
