import api from "./search"
import { trim, trimEnd, isArray, get, kebabCase } from "lodash"



//move this to a class service, then remove this file.
export async function similarJobs(title, location, limit = 12) {
    try {

        let { jobs } = await searchJobs({
            config: config,
            data: {
                title,
                location,
                sort: "relevance",
            },
        })

        let currentUrl = ""

        if (process.isClient) {
            currentUrl = window.location.pathname
        }

        return jobs
            .filter(job => {
                return currentUrl !== getDetailUrl(job.job)
            })
            .slice(0, limit)
    } catch (err) {
        return []
    }
}


