// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  css: [
    //"vuetify/styles/main.sass",
    "@mdi/font/css/materialdesignicons.css",
    "@/assets/styles/main.scss",
  ],
  build: {
    transpile: ["vuetify", "vue-awesome-paginate"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/supabase",
    "nuxt-icon",
    "@pinia/nuxt",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls: {
          tags: {
            "v-img": ["src"], //<----- add v-img
            // default values will be overridden if not repeated:
          },
        },
      },
    },
  },
  supabase: {
    redirect: false,
  },
  buildModules: ["@pinia/nuxt"],
});
