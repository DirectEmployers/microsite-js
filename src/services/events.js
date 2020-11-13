import {kebabCase} from "lodash"
import {blank} from "./helpers"
import {TIMEOUT_THRESHOLD, api} from "./search"

export class GoogleTalentClientEvent {
    static getSavedTalentData() {
        try {
            return JSON.parse(sessionStorage.getItem("talent"))
        } catch (e) {
            return {}
        }
    }

    static saveTalentEventData(data) {
        if (process.isClient) {
            sessionStorage.setItem("talent", JSON.stringify(data))
        }
    }

    static async post(input, siteConfig) {
        //if no request id is available or client events is disabled, do nothing.
        if (blank(input.requestId) || siteConfig.client_events === false) {
            return
        }

        try {
            let response = await api().post(
                "google-talent/event",
                {
                    data: input,
                    config: {
                        project_id: siteConfig.project_id,
                        tenant_uuid: siteConfig.tenant_uuid,
                        company_uuids: siteConfig.company_uuids,
                    },
                },
                {timeout: TIMEOUT_THRESHOLD}
            )

            //save the new request id in local storage.
            if (response.data) {
                input["requestId"] = response.data.request_id
                GoogleTalentClientEvent.saveTalentEventData(input)
            }

            return response
        } catch (error) {
            if (Object.prototype.hasOwnProperty.call(error, "response")) {
                return error
            }
            throw new Error(error)
        }
    }
}
