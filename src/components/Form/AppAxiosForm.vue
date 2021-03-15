<template>
    <form @submit.prevent="submit" ref="form">
        <slot :data="data" :set="set"></slot>
    </form>
</template>

<script>
import { set, get } from 'lodash'
import { serializeToFormData } from '../../services/helpers'
export default {
    props: {
        name: {
            type: String,
            required: false,
            default() {
                return new String(this._uid).toString();
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
        onSuccess: {
            type: Function,
            required: false,
            default: () => {},
        },
        onError: {
            type: Function,
            default: () => {},
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
    created(){
        if(this.method == 'get'){
            throw new Error("AppAxiosForm component is meant for non-get requests, use AppFetch for get requests.")
        }
    },
    data(){
        return {
            data: {...this.initData},
            errors: {},
            rules: {},
            loading: false,
            withFiles: false,
        }
    },
    watch: {
        data: {
            deep: true,
            handler(){
                console.log('The list of colours has changed!');
            }
        }
    },

    methods:{
        set(name, value){
            if (value instanceof FileList || value instanceof File) {
                this.withFiles = true
            }
            set(this.data, name, value)
        },
        client() {
            let data = this.data
            let method = this.method
            const endpoint = this.endpoint
            let options = this.options
            if (this.withFiles) {
                data = this.toFormData()
                option.headers = option.headers || {}
                options.headers['Content-Type'] = 'multipart/form-data'
            }
            return axios[method](endpoint, data, options)
        },
        toFormData() {
            return serializeToFormData(this.data)
        },
        submit(){

        }
    }
}
</script>
