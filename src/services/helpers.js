import { kebabCase } from "lodash"
import { removeCountry } from "./api/location"
import AppSolrJob from "../components/JobTypes/AppSolrJob"
import AppGoogleTalentJob from "../components/JobTypes/AppGoogleTalentJob"


/**Get the associated job component for the given source */
export function getJobComponent(source){
    switch(source){
        case "google_talent":
            return AppGoogleTalentJob
        default: 
            return AppSolrJob
    }
}
/**
 * Check if the given value is "blank".
 */
export function blank(value) {
    let isBlank = false

    if ([undefined, null, NaN, ""].includes(value)) {
        isBlank = true
    } else if (typeof value === "string" && value.trim().length === 0) {
        isBlank = true
    } else if (Array.isArray(value) && value.length == 0) {
        isBlank = true
    } else if (typeof value === "object" && Object.keys(value).length === 0) {
        isBlank = true
    }

    return isBlank
}

/**
 * Run the given function and keep trying if it fails
 * until the max retries are exceeded and return a promise.
 */
export function retry(callback, args = [], max = 5, delay = 100) {
    return new Promise((resolve, reject) => {
        try {
            let result = callback(...args)
            return resolve(result)
        } catch (e) {
            if (max > 0) {
                setTimeout(function() {
                    return retry(callback, args, --max, delay * 2)
                        .then(resolve)
                        .catch(err => {
                            return reject(err)
                        })
                }, delay)
            } else {
                return reject(e)
            }
        }
    })
}

/**
 * Log to console only when ENV is development.
 */
export function log(message, context = "log") {
    if (process.env.NODE_ENV == "development") {
        console[context](message)
    }
}

/**
 * Build a job detail url.
 */
export function buildJobDetailUrl(title, location, guid) {
    const locationSlug = kebabCase(removeCountry(location))

    const titleSlug = kebabCase(title)

    return `/${locationSlug}/${titleSlug}/${guid}/job/`
}


