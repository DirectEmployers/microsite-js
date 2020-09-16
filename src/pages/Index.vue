<template>
    <Layout>
        <AppSearchProvider
            class="mt-6"
            :search-on-load="false"
            :site-config="$siteConfig"
            v-slot="{
                input,
                submitSearchForm,
                supported,
                getUserCoordinates,
            }"
        >
            <div class="mx-4">
                <SearchForm
                    :input="input"
                    :submitSearchForm="submitSearchForm"
                    :supported="supported"
                    :getUserCoordinates="getUserCoordinates"
                />
            </div>
        </AppSearchProvider>
    </Layout>
</template>
<script>
import AppSearchProvider from "~/components/Search/AppSearchProvider"
import AppYoutube from "~/components/AppYoutube"
import AppModal from "~/components/AppModal"
import SearchForm from "~/demo/components/SearchForm"
export default {
    components: {
        AppModal,
        AppYoutube,
        AppSearchProvider,
        SearchForm,
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
    },
    methods: {
        toggleExampleModal() {
            this.$refs["example-modal"].toggle()
        },
    },
}
</script>
