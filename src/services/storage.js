/**Helpers for working with local/session storage */
import {omitBy} from "lodash"
import {blank} from "./helpers"
import buildUrl from "axios/lib/helpers/buildURL"

export const ACCEPTED_COOKIES_KEY = "accepted_cookie_use"
export const DECLINED_COOKIES_KEY = "declined_cookie_use"

/**
 * Cookie Consent
 */

/**
 * Check if a key is stored as a string value.
 */
export function isStoredAs(key, stored_as, storageType = "localStorage") {
    if (!process.isClient) {
        return false
    }

    return window[storageType].getItem(key) === JSON.stringify(stored_as)
}
/**
 * Check if storage contains has declined cookie use.
 */
export function declinedCookieUse() {
    return isStoredAs(DECLINED_COOKIES_KEY, true)
}
/**
 * Check if storage contains has accepted cookie use.
 */
export function acceptedCookieUse() {
    return isStoredAs(ACCEPTED_COOKIES_KEY, true)
}

/**
 * Check if storage contains has accepted or declined cookie use.
 */
export function acknowledgedCookieUse() {
    return acceptedCookieUse() || declinedCookieUse()
}

/**
 * View Source Handling
 **/
export const VS_KEY = "vs"
export const UTM_KEY = "external_utm"

/**
 * Set utm & vs paramaters.
 */
export function setViewSourceParameters(query) {
    if (process.isClient) {
        const viewSource = query[VS_KEY]

        if (!blank(viewSource)) {
            sessionStorage.setItem(VS_KEY, viewSource)
        }

        let params = {}

        Object.keys(query).forEach(key => {
            if (key.startsWith("utm_")) {
                params[key] = query[key]
            }
        })

        if (!blank(params)) {
            sessionStorage.setItem(UTM_KEY, JSON.stringify(params))
        }
    }
}

/**
 * Build an apply link for the given guid but
 * append on any existing and stored UTM & VS paramerters
 * stored in session storage.
 */
export function buildJobApplyLink(guid, query = {}) {
    let url = "https://rr.jobsyn.org/" + guid

    if (!process.isClient) {
        return url
    }

    let utm_params = {}
    try {
        utm_params = JSON.parse(sessionStorage.getItem(UTM_KEY))
    } catch {
        utm_params = {}
    }

    let params = {...query, ...utm_params}
    params[VS_KEY] = sessionStorage.getItem(VS_KEY)

    return buildUrl(url, omitBy(params, blank))
}
