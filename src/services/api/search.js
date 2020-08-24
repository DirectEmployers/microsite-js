import axios from "axios"
import { kebabCase } from "lodash"
import GoogleTalentJob from "../../services/api/drivers/job/google-talent"
import SolrJob from "../../services/api/drivers/job/solr"

export default function api() {
    return axios.create({
        baseURL: process.env.GRIDSOME_API_URL,
        withCredentials: false,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
}

class BaseSearchService {
    static getJobDriver(source) {
        switch (source) {
            case "solr":
                return SolrJob
            case "google_talent":
                return GoogleTalentJob
            default:
                throw new Error(`Unsupported job driver/source ${source}`)
        }
    }

    static wrapJobDriver(jobs, source) {
        const JobDriver = BaseSearchService.getJobDriver(source)

        jobs = (jobs || []).map((job) => {
            return new JobDriver(job)
        })

        return jobs
    }
}

export class SearchService extends BaseSearchService {
    static async get(input, siteConfig) {
        const source = kebabCase(siteConfig.sources.search)

        try {
            let response = await api().post(`${source}/search`, {
                data: input,
                config: siteConfig,
            })

            const data = response.data

            response.data.jobs = SearchService.wrapJobDriver(
                data.jobs,
                data.meta.source
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

export class CommuteSearchService extends BaseSearchService {
    static async get(input, siteConfig) {
        const source = kebabCase(siteConfig.sources.commute)

        try {
            let response = await api().post(`${source}/commute`, {
                data: input,
                config: siteConfig,
            })
            const data = response.data

            response.data.jobs = CommuteSearchService.wrapJobDriver(
                data.jobs,
                data.meta.source
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
        const source = kebabCase(siteConfig.sources.complete)

        try {
            const response = await api().get(`${source}/complete/title`, {
                params: {
                    data: { q: q },
                    config: {
                        sources: { complete: siteConfig.sources.complete },
                        buids: siteConfig.buids,
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
