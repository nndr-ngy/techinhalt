<template>
    <div v-if="story" class="blog-einzeln">
        <div class="blog-header" :style="{ backgroundImage: `url(${story.content.thumbnailImage})` }">
            <div class="header-content">
                <h1 class="titlescreen">{{ story.content.title }}</h1>
                <p class="titlesubsection">{{ story.content.summary }}</p>
            </div>
        </div>
        
        <div class="blog-content">
            <p v-if="story.created_at"><strong>Erstellt am:</strong> {{ new Date(story.created_at).toLocaleDateString() }}</p>
            <p v-if="story.published_at"><strong>Veröffentlicht am:</strong> {{ new Date(story.published_at).toLocaleDateString() }}</p>
            <p v-if="story.updated_at"><strong>Zuletzt aktualisiert:</strong> {{ new Date(story.updated_at).toLocaleDateString() }}</p>
            
            <p v-if="story.content.category.length"><strong>Kategorie:</strong> {{ story.content.category.join(', ') }}</p>
            <p v-if="story.content.hashtags"><strong>Hashtags:</strong> {{ story.content.hashtags }}</p>
            
            <p v-if="story.content.plan"><strong>Plan:</strong> {{ story.content.plan }}</p>
            <blockquote v-if="story.content.quote"><strong>Zitat:</strong> {{ story.content.quote }}</blockquote>
            
            <div v-if="story.content.content">
                <p v-for="(paragraph, index) in story.content.content.split('\n')" :key="index">
                    {{ paragraph }}
                </p>
            </div>

            
            <p v-if="story.content.companylink">
                <strong>Weitere Infos:</strong> <a :href="story.content.companylink" target="_blank">Zur Website</a>
            </p>
        </div>
    </div>
    
    <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
    </div>
</template>

<script>
import { useStoryblokApi, apiPlugin } from "@storyblok/vue";
import { renderRichText, storyblokInit } from "@storyblok/js";
import { ref, onMounted } from "vue";

export default {
    setup() {
        const story = ref(null);
        const error = ref(null);
        const richTextContent = ref("");

        storyblokInit({
            accessToken: "KX9jqarQ8v5jZp26z60yaQtt",
            use: [apiPlugin]
        });

        const storyblokApi = useStoryblokApi();

        const fetchStory = async () => {
            try {
                const { data } = await storyblokApi.get(`cdn/stories/news/${window.location.pathname.split('/').pop()}`, {
                    version: "published"
                });
                story.value = data.story;
                
                if (story.value.content.content) {
                    richTextContent.value = renderRichText(story.value.content.content);
                }
            } catch (err) {
                console.error("Error fetching story:", err);
                error.value = err.response || "This record could not be found";
            }
        };

        onMounted(fetchStory);

        return {
            story,
            error,
            richTextContent
        };
    }
};
</script>

<style scoped>
.blog-header {
    height: 500px;
    background-position: center;
    background-size: cover;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.header-content {
    text-align: center;
    color: white;
    z-index: 1;
    padding: 20px;
}
.blog-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}
.blog-einzeln {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
}
.blog-content {
    max-width: 800px;
    padding: 5vw 1vw;
}
.error-message {
    color: red;
    text-align: center;
    padding: 20px;
}
</style>
