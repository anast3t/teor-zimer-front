import { createApp } from 'vue';
import App from './App.vue';
// import './registerServiceWorker'; //INFO: IF PWA
import router from './router';

//SECTION: Vuetify
import "@mdi/font/css/materialdesignicons.css";
import 'vuetify/styles';
import vuetifyConfig from '@/plugins/vuetify';

//SECTION: Toastification
import Toast, {PluginOptions, POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/styles/toast.css";
const toastOptions: PluginOptions = {
	position: "bottom-right" as POSITION,
	timeout: 10000
};

//SECTION: App creation
createApp(App)
	.use(Toast, toastOptions)
	.use(router)
	.use(vuetifyConfig)
	.mount('#app');
