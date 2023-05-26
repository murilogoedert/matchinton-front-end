import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import jQuery from "jquery";

import { makeServer } from './mock/mirajeServer'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '../src/assets/main.css';

const app = createApp(App)

if (process.env.NODE_ENV === "development") {
    makeServer()
}

Object.assign(window, { $: jQuery, jQuery });

app.use(createPinia())
app.use(router)

const vuetify = createVuetify({
    components,
    directives
})

app.use(vuetify);

app.mount('#app')

