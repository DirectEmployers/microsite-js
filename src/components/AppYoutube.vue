<template>
    <div class="video">
        <div class="video__wrapper">
            <iframe
                :src="youtubeUrl"
                title="Youtube Video"
                frameborder="0"
                loading="lazy"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            >
            </iframe>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        src: {
            type: String,
            required: true,
        }
    },
    metaInfo() {
        return {
            meta: [
                { rel: 'preconnect', href: 'https://www.youtube.com/' },
                { rel: 'preconnect', href: 'https://googleads.g.doubleclick.net/' },
                { rel: 'preconnect', href: 'https://static.doubleclick.net/' }
            ]
        }
    },
    computed: {
        youtubeUrl: function() {
            return `https://www.youtube.com/embed/${this.src}?rel=0`
        }
    }
}
</script>

<style lang="scss">
.video {
    margin-bottom: 20px;
    background: #f7f7f7;
    padding: 30px;
    &__wrapper {
        position: relative;
        height: 0;
        padding-bottom: 56.25%;
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}

</style>