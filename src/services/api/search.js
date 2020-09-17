import axios from "axios"
import {kebabCase} from "lodash"

const TIMEOUT_THRESHOLD = 5000

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
        const source = kebabCase(siteConfig.source)

        try {
            const response = await api().get(`${source}/complete/title`, {
                params: {
                    data: {q: q},
                    config: {
                        buids: siteConfig.buids,
                        project_id: siteConfig.project_id,
                        tenant_uuid: siteConfig.tenant_uuid,
                        company_uuids: siteConfig.company_uuids,
                    },
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
