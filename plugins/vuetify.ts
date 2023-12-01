import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
// import "@/styles/main.scss";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

//import "~/assets/scss/main.scss";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: true,
    components,
    directives,
    
  });
  app.vueApp.use(vuetify);
});
