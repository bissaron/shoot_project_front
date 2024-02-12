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
import { VDataTable } from 'vuetify/lib';


export default {
  name: "App",

  components: {
    VDataTable, // เปลี่ยนจาก VTable เป็น VDataTable
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
