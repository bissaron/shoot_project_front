import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#1F1604",
        secondary: "#FFB722",
        accent: "#F99417",
        error: "#b71c1c",
      },
    },
  },
});