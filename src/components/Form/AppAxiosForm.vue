<template>
    <form @submit.prevent="submit" ref="form">
        <slot
            :data="data"
            :failed="failed"
            :errors="errors"
            :success="success"
            :loading="loading"
            :response="response"
        ></slot>
    </form>
</template>

<script>
import axios from "axios"
export default {
    props: {
        name: {
            type: String,
            required: false,
            default() {
                return new String(this._uid).toString()
            },
        },
        endpoint: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            default: "post",
        },
        options: {
            type: Object,
            required: false,
            default: () => {
                return {}
            },
        },
        initData: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    created() {
        if (this.method.toLowerCase() == "get") {
            throw new Error(
                "AppAxiosForm component is meant for non-get requests, use AppFetch for get requests."
            )
        }
    },
    data() {
        return {
            data: {...this.initData},
            errors: {},
            response: {},
            failed: false,
            success: false,
            loading: false,
        }
    },
    methods: {
        client() {
            let data = this.data
            const headers = this.options.headers || {}
            // auto serialize to form data if this header is present
            if (headers["Content-Type"] == "multipart/form-data") {
                data = this.serializeToFormData(this.data)
            }
            return axios[this.method](this.endpoint, data, this.options)
        },

        serializeToFormData(value, formData, property) {
            let resultData = formData || new FormData()

            if (Array.isArray(value) && value.length) {
                value.forEach(val => {
                    this.serializeToFormData(val, resultData, property + "[]")
                })
            } else if (typeof value == "object" && !(value instanceof File)) {
                Object.keys(value).forEach(prop => {
                    this.serializeToFormData(
                        value[prop],
                        resultData,
                        property ? property + "[" + prop + "]" : prop
                    )
                })
            } else {
                resultData.append(property, value)
            }

            return resultData
        },

        submit() {
            this.errors = {}
            this.failed = false
            this.success = false
            this.loading = true

            this.client()
                .then(response => {
                    this.success = true
                    this.response = response
                    this.$emit('success', response)
                })
                .catch(e => {
                    this.failed = true
                    let response = e.response || {}
                    this.response = response
                    let data = response.data || {}
                    //extract any errors if they were given in the response
                    this.errors = data.errors || {}
                    this.$emit('failed', response)
                })
                .finally(() => {
                    this.loading = false
                })
        },
    },
}
</script>
