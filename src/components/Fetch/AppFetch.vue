<template>
    <ClientOnly>
        <component :is="tag">
            <slot
                :data="responseData"
                :request="this.request"
                :status="{resolved: resolved, error: error, pending: pending}"
            ></slot>
        </component>
    </ClientOnly>
</template>

<script>
import axios from "axios"
import {blank} from "../../services/helpers"

export default {
    props: {
        endpoint: {
            type: [String, Function, Promise],
            required: true,
        },
        requestOnCreated: {
            type: Boolean,
            required: false,
            default: true,
        },
        parameters: {
            required: false,
            type: Object,
            default: () => {
                return {}
            },
        },
        options: {
            required: false,
            type: Object,
            default: () => {
                return {}
            },
        },
        tag: {
            default: "div",
            required: false,
        },
        onResolve: {
            type: Function,
            required: false,
            default: null,
        },
        onFailure: {
            type: Function,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            response: null,
            error: null,
            pending: false,
            resolved: null,
        }
    },
    created() {
        if (this.requestOnCreated) {
            this.request()
        }
    },
    computed: {
        responseData() {
            return this.response?.data || {}
        },
        requestPayload() {
            if (blank(this.parameters)) {
                return this.options
            }

            return {params: this.parameters, ...this.options}
        },
        requestHandler() {
            if (typeof this.endpoint == "function") {
                return this.endpoint(this.requestPayload)
            } else if (this.endpoint instanceof Promise) {
                return this.endpoint
            }
            return axios.get(this.endpoint, this.requestPayload)
        },
    },
    methods: {
        async request() {
            this.response = null
            this.status({error: false, pending: true})
            try {
                this.response = await this.requestHandler
                //if a resolve function was given, call it and
                //let implementer mark status as resolved.
                if (typeof this.onResolve == "function") {
                    this.onResolve(
                        this.responseData,
                        this.response,
                        this.status
                    )
                } else {
                    this.status({
                        resolved: true,
                    })
                }
            } catch (error) {
                //if a failure function was given, call it and
                //let the implementer mark error and resolve status.
                if (typeof this.onFailure == "function") {
                    this.onFailure(error, this.status)
                } else {
                    this.status({
                        error,
                        resolved: false,
                    })
                }
            }
        },
        status({error = null, pending = false, resolved = null}) {
            this.error = error
            this.pending = pending
            this.resolved = resolved
        },
    },
}
</script>
