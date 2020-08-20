import axios from "axios"

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
        try {
            const response = await api().post("search", {
                data: input,
                config: siteConfig,
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

export class CommuteSearchService {
    static async get(input, siteConfig) {
        try {
            const response = await api().post("commute", {
                data: input,
                config: siteConfig,
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

export class TitleCompleteService {
    static async get(q, siteConfig) {
        try {
            const response = await api().get("complete/title", {
                params: {
                    data: { q: q },
                    config: {
                        sources: { complete: siteConfig.sources.complete },
                        buids:siteConfig.buids,
                        project_id: siteConfig.project_id,
                        tenant_uuid: siteConfig.tenant_uuid,
                        company_uuids: siteConfig.company_uuids,
                    },
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
