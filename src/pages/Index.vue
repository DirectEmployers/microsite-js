<template>
    <Layout>
        <component :is="provider"
            class="mt-6"
            :search-on-load="false"
            :site-config="$siteConfig"
            @searchCompleted="setProvider"
            v-slot="{
                input,
                source,
                newSearch,
            }"
        >
            <div class="mx-4">
                <AppSearchForm
                    :input="input"
                    :source="source"
                    @search="newSearch"
                />
            </div>
        </component>
    </Layout>
</template>
<script>
import AppSearchForm from "~/demo/components/AppSearchForm"
import {getProvider} from "~/services/search"
export default {
    components: {
        AppSearchForm,
    },
    data () {
        return {
            provider: getProvider(this.$siteConfig.source)
        }
    },
    methods:{
        setProvider(source){
            this.provider = getProvider(source)
        }
    },
    metaInfo: {
        title: "Home",
        meta: [
            {
                key: "description",
                name: "description",
                content: "only the best jobs",
            },
        ],
    }
}
</script>

