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
        <a href="#" @click="toggleExampleModal()">
            Modal
        </a>
        <AppModal id="example-modal" ref="example-modal" title="Example Modal">
            <template v-slot:content>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                    ab quas animi expedita, doloribus, quod ratione, ut magnam
                    culpa eaque nostrum recusandae tempora dolorem soluta
                    quibusdam nam cum nihil eum! <a href="#">test2</a>
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae ratione tenetur doloremque totam vel maiores ad
                    ducimus inventore autem voluptatibus modi quam eaque odit
                    amet voluptas quibusdam porro, repellat obcaecati <a href="#">Test</a>
                </p>
            </template>
        </AppModal>
    </Layout>
</template>
<script>
import AppSearchProvider from "~/components/Search/AppSearchProvider"
import SearchForm from "~/demo/components/SearchForm"
import AppModal from "~/components/AppModal"
export default {
    components: {
        AppSearchProvider,
        SearchForm,
        AppModal,
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
