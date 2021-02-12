import {
    blank
} from "./helpers"

import {
    TIMEOUT_THRESHOLD,
    api
} from "./search"

export function googleTalentEventService(input, siteConfig) {
    //if no request id is available or client events is disabled, do nothing.
    if (blank(input.requestId) || siteConfig.client_events === false) {
        return new Promise((resolve, reject) => {
            reject({
                error: "Client events disabled or no request id available."
            })
        })
    }

    return api().post(
        "google-talent/event", {
            data: input,
            config: siteConfig
        }, {
            timeout: TIMEOUT_THRESHOLD
        }
    )
}