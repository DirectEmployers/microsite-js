<template>
    <Layout>
        <AppAxiosForm
            endpoint="https://talent-community.recruitrooster.com/data-collection/19/embed/collect"
            :init-data="{ 'job_seeker_prop-categories': [] }"
        >
            <template v-slot="{data}">
                <label
                    for="job_seeker_prop-first_name_120"
                    class="visuallyHidden"
                >
                    First name
                </label>
                <input
                    type="text"
                    required=""
                    aria-required="true"
                    placeholder="First name"
                    name="job_seeker_prop-first_name"
                    id="job_seeker_prop-first_name_120"
                    v-model="data['job_seeker_prop-first_name']"
                />
                 <label
                    for="job_seeker_prop-categories_127"
                    class="visuallyHidden categories"
                >
                    Categories (you may select more than one using Ctrl + Click or Command + Click)
                </label>
                <select
                    multiple=""
                    name="job_seeker_prop-categories"
                    id="job_seeker_prop-categories_127"
                    data-default="[]"
                    v-model="data['job_seeker_prop-categories']"
                >
                    <option disabled="" hidden="" value="">
                        Categories (you may select more than one)
                    </option>
                    <option value="22">Engineering</option>
                    <option value="23">
                        Finance/Accounting
                    </option>
                    <option value="24">Human Resources</option>
                    <option value="25">
                        Information Technology
                    </option>
                    <option value="26">Legal</option>
                    <option value="27">Marketing</option>
                    <option value="28">Operations</option>
                    <option value="29">
                        Product Management
                    </option>
                    <option value="30">Sales</option>
                </select>
            </template>

        </AppAxiosForm>
        <!-- <AppGoogleTalentSearchProvider
            class="mt-6"
            :search-on-load="false"
            :site-config="$siteConfig"
            :is-load-more="$static.metadata.paginationType == 'load'"
            v-slot="{input, source, newSearch}"
        >
            <div class="mx-4">
                <AppSearchForm
                    :input="input"
                    :source="source"
                    @search="newSearch"
                />
            </div>
        </AppGoogleTalentSearchProvider> -->
    </Layout>
</template>

<script>
import AppSearchForm from "~/demo/components/AppSearchForm"
import AppAxiosForm from "~/components/Form/AppAxiosForm"
import AppGoogleTalentSearchProvider from "~/components/Search/Providers/AppGoogleTalentSearchProvider"

export default {
    components: {
        AppAxiosForm,
        AppSearchForm,
        AppGoogleTalentSearchProvider,
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
}
</script>

<static-query>
query {
    metadata {
        paginationType,
        siteName,
    }
}
</static-query>
