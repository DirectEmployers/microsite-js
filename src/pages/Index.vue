<template>
    <Layout>
        <AppSearchProvider
           :site-config="$siteConfig"
            v-slot="{
                input,
                submitSearchForm,
                hasInput,
                supported,
                getUserCoordinates,
            }"
        >
            <div class="mx-4">
                <SearchForm
                    :input="input"
                    :submitSearchForm="submitSearchForm"
                    :supported="supported"
                    :hasInput="hasInput"
                    :getUserCoordinates="getUserCoordinates"

                />
            </div>
        </AppSearchProvider>
    </Layout>
</template>
<script>
import AppSearchProvider from "~/components/AppSearchProvider"
import SearchForm from "~/demo/components/SearchForm"
export default {
    components:{
        AppSearchProvider,
        SearchForm,
    },
    metaInfo: {
        title: "Home",
        meta: [
            {
                key: "description",
                name: "description",
                content: "only the best jobs"
            }
        ]
    }
}
</script>
