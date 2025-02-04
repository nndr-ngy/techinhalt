<template>
    <div class="newsheader container">
      <div class="sitemaxwidth">
        <div class="overflow"> <h1 ref="title" class="titlescreen">Aktuelles</h1> </div>
          <div class="newsheaderwrap">
            
            <section
              v-for="(story, index) in newStories"
              :key="story.id"
            >
            <router-link :to="{ name: 'newsEinzeln', params: { slug: story.slug } }">
              <div class="news-content overflow">
                <img :src="story.content.thumbnailImage" :alt="story.content.thumbnailImage.alt" width="960" height="540" />
                <div class="newstextbox">
                <h2 class="titlesection">{{ story.content.title }}</h2>
                <p class="bodymedium">{{ story.content.summary }}</p>
                <p class="texthover">Mehr erfahren</p>
                </div>
              </div>
            </router-link>
            </section>
            
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useStoryblokApi } from "@storyblok/vue";

  
  
  export default {
    data() {
      return {
        newStories: [],
        activeIndex: 1
      };
    },
    methods: {
  
    },
    async created() {
      const storyblokApi = useStoryblokApi();
      const { data } = await storyblokApi.get("cdn/stories", {
        starts_with: "news/",
        version: "published",
        sort_by: "created_at:desc",
      });
      this.newStories = data.stories;
    },
  };
  </script>
  
  <style scoped>
  .newsheader {display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding: 10vw 1vw 5vw 1vw; width: 100%; height: 100%; position: relative; max-width: 100vw; font-size: 12px;}
  .newsheaderwrap {display: flex; flex-direction: row; flex-wrap: wrap; justify-content: flex-start; align-items: stretch; width: 100%; height: 100%; min-height: 80vh; position: relative; z-index: 1; gap: 50px;}
  .news-content {display: flex; flex-direction: column; width: 100%; height: 100%;  min-height: 390px; background: var(--white); border-radius: 4px; box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.25); transition: all .5s;}
  
  .newsheader .overflow {margin-bottom: 80px;}
  
  .newstextbox {display: flex; flex-direction: column; padding: 20px 10px; justify-content: space-between; gap: 20px; align-items: flex-start;}
  .news-content .texthover {font-size: 1.2rem; display: inline;}
  
  .newsheaderwrap section {width: 30%; display: flex; overflow: hidden;}
  
  .newstextbox {flex-grow: 1;display: flex;flex-direction: column;justify-content: space-between;}
  
  .news-content h2 {line-height: 1; color: var(--hellblack); max-width: 90%; margin-top: 15px;}
  .news-content img {width: 100%; height: 230px; object-fit: cover; transform: scale(1.15); transition: all .5s;}
  
  .news-content:hover {transform: scale(1.05); box-shadow: 0px 0px 10px 10px rgba(0,0,0,0.25)}
  
  @media only screen and (max-height: 800px) {
    .news-content img {width: 100%; height: 220px; object-fit: cover; border-radius: 4px 4px 0 0;}
    .news-content {display: flex; flex-direction: column;  min-height: 350px; background: var(--white); border-radius: 4px; box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.25);}
    .newsheader h1 {margin-bottom: 20px;}
  }
  
  </style>