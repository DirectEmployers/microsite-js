<template>
    <component :is="tag">
        <slot
            v-bind="slotData()"
        >
        </slot>
    </component>
</template>

<script>

import base from './mixins/provider'

export default{
    mixins: [base],
    methods: {
        providerInputDefinition(){
            return {
                moc: {
                    default: ""
                }
            }
        }
    }
}
</script>