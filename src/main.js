import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { StoryblokVue, apiPlugin } from '@storyblok/vue'


const app = createApp(App);

app.use(StoryblokVue, {
    accessToken: 'KX9jqarQ8v5jZp26z60yaQtt',
    use: [apiPlugin],
});


app.use(router)

app.mount('#app');