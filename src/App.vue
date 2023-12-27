<template>
  <v-app>
    <NavBar />
    <v-main :class="mainClass">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",

  components: {
    NavBar,
    Footer,
  },
  data: () => ({
    //
  }),
  computed: {
    mainClass() {
      return {
        "d-flex justify-center align-center": this.$route.path === "/login" || this.$route.path === "/admin" ,
      };
    },
  },
};
</script>
