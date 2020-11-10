import { kebabCase } from 'lodash'
import { blank } from './helpers'
import { TIMEOUT_THRESHOLD, api } from './search'

export class GoogleTalentClientEvent{

    static getSavedRequestId(){
        try{
            return JSON.parse(localStorage.getItem('talent')).requestId
        }catch(e){
            return null
        }
    }

    static saveTalentEventData(eventType, requestId){
        if(!blank(requestId) && process.isClient){
            localStorage.setItem('talent', JSON.stringify({ type: eventType,  requestId: requestId}))
        }

    }

    static async post(input, siteConfig) {
        //if no request id is available, do nothing.
        if(blank(input.requestId)){
            return
        }

        try {
            let response = await api().post(
                'google-talent/event',
                {
                    data: input,
                    config: {
                        project_id: siteConfig.project_id,
                        tenant_uuid: siteConfig.tenant_uuid,
                        company_uuids: siteConfig.company_uuids
                    },
                },
                {timeout: TIMEOUT_THRESHOLD}
            )

            //save the new request id in local storage.
            if(response.data){
                GoogleTalentClientEvent.saveTalentEventData(input.eventType, response.data.request_id)
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