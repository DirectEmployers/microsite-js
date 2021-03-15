<template>
    <form @submit.prevent="submit" ref="form">
        <slot :data="data"></slot>
    </form>
</template>

<script>
import { set } from 'lodash'
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
    mounted(){
        this.$el.elements.forEach((input)=>{
            if(input.name){
                let defaultValue = input.getAttribute('data-default')
                if(defaultValue){
                    defaultValue = JSON.parse(defaultValue)
                }
                set(this.data, input.name, defaultValue || "")
            }
        })
    },

    methods:{
        client() {
            let data = this.data
            const headers = this.options.headers || {}
            // auto serialize to form data if this header is present
            if (headers.contains('multipart/form-data')){
                data = this.toFormData()
                option.headers = option.headers || {}
                options.headers['Content-Type'] = 'multipart/form-data'
            }
            return axios[this.method](this.endpoint, data, options)
        },

        serializeToFormData(obj, formData, parentKey) {
            let resultData = formData || new FormData()
            let property, formKey

            for (property in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, property)) {
                    continue
                }
                formKey = parentKey ?  parentKey + '[' + property + ']' : property

                if (
                    typeof obj[property] === 'object' &&
                    !(obj[property] instanceof File)
                ) {
                    resultData = this.serializeToFormData(
                        obj[property],
                        resultData,
                        property
                    )
                } else {
                    // if it's a string or a File object
                    resultData.append(formKey, obj[property])
                }
            }

            return resultData
        },

        toFormData() {
            return this.serializeToFormData(this.data)
        },
        submit(){

        }
    }
}
</script>
