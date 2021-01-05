<template>
    <component :is="tag">
        <slot v-bind="slotData()"></slot>
    </component>
</template>
<script>
import base from "./mixins/job"
import { GOOGLE_TALENT } from '../../services/search';
import { googleTalentEventService } from '../../services/events';
export default {
    mixins: [base],
    methods:{
        clickedApplyJob(){
            //until we load jobs from google talent for job detail pages
            //or have the google talent job name available on job detail
            //pages for google talent sites, we need to do the redirect event logic in
            // this component since it is used for job detail pages.
            if(this.siteConfig.source == GOOGLE_TALENT){
                var event = null;
                try{
                    event = JSON.parse(sessionStorage.getItem(GOOGLE_TALENT)).event
                }catch(e){
                    return
                }
                // grab the saved view event and send off the data for a redirect event.
                if(event.eventType == 'view'){
                    event.eventType = 'redirect'
                    googleTalentEventService(
                        event,
                        {
                            client_events: this.siteConfig.client_events,
                            project_id: this.siteConfig.project_id,
                            tenant_uuid: this.siteConfig.tenant_uuid,
                            company_uuids: this.siteConfig.company_uuids,
                        }
                    ).then(response => {
                        event.requestId = (response.data || {}).request_id
                        sessionStorage.setItem(
                            GOOGLE_TALENT,
                            JSON.stringify({
                                event: event,
                            })
                        )
                    }).catch(()=>{})
                }
            }

        }
    }
}
</script>
