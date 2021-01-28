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
}
</script>
