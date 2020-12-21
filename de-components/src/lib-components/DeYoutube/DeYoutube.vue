<template>
    <div class="video">
        <iframe
            :src="youtubeUrl"
            title="Youtube Video"
            frameborder="0"
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            required: true,
        },
    },
    metaInfo() {
        return {
            meta: [
                {rel: "preconnect", href: "https://www.youtube.com/"},
                {
                    rel: "preconnect",
                    href: "https://googleads.g.doubleclick.net/",
                },
                {rel: "preconnect", href: "https://static.doubleclick.net/"},
            ],
        }
    },
    computed: {
        youtubeUrl: function () {
            return `https://www.youtube.com/embed/${this.src}?rel=0`
        },
    },
}
</script>

<style lang="scss" scoped>
@import "./DeYoutube";
</style>