<template>
    <div>
        <main id="content">
            <AppNavbar
                :links="[
                    {href: '/', display: 'Home'},
                    {href: '/jobs', display: 'Jobs'},
                ]"
            >
                <template v-slot:logo>
                    <g-link to="/">
                        <img
                            style="border-radius: 50%;"
                            width="50px"
                            height="50px"
                            src="//d2e48ltfsb5exy.cloudfront.net/myjobs/logos/DE-icon-bleed.png"
                            alt="Logo"
                        />
                    </g-link>
                </template>
            </AppNavbar>
            <slot />
            <AppCookieConsent
                class="fixed bottom-0 right-0 left-0 bg-white p-4 border-t border-gray-300"
            >
                <template v-slot="{acceptCookieUse, declineCookieUse}">
                    <p>
                        We use cookies to improve your experience on our site.
                        To find out more, read our
                        <a
                            class="text-blue-400 hover:underline"
                            href="https://directemployers.org/privacy-terms/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            privacy policy
                        </a>
                        .
                    </p>
                    <div class="flex">
                        <button
                            @click="acceptCookieUse"
                            class="button"
                            type="button"
                        >
                            Accept Cookies
                        </button>
                        <button
                            @click="declineCookieUse"
                            class="button"
                            type="button"
                        >
                            Decline Cookies
                        </button>
                    </div>
                </template>
            </AppCookieConsent>

            <AppDETracker />
        </main>
    </div>
</template>

<script>
import AppDETracker from "~/components/AppDETracker"
import AppCookieConsent from "~/components/AppCookieConsent"
import AppNavbar from "~/components/AppNavbar"
import {setViewSourceParameters} from "~/services/storage"
export default {
    components: {
        AppNavbar,
        AppDETracker,
        AppCookieConsent,
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
    created() {
        setViewSourceParameters(this.$route.query)
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
