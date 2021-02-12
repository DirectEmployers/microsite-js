<template>
    <component :is="tag">
        <slot v-bind="slotData()"></slot>
    </component>
</template>

<script>
import base from "./mixins/job"

export default {
    mixins: [base],
}
</script>
