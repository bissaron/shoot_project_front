<template>
    
    <button @click="toggleIsBig">Toggle isBig</button>
  </template>
  
  <script>
  export default {
    methods: {
      toggleIsBig() {
        this.$store.commit('toggleIsBig');
      }
    }
  };
  </script>