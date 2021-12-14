import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faArrowRight, faArrowLeft, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import "element-plus/dist/index.css";

import store from './store';
import ElementPlus from "element-plus";
library.add([faHome, faArrowRight, faArrowLeft, faBriefcase])

const app = createApp(App).use(store).use(ElementPlus)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});