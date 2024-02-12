<template>
    <div>
      <p>{{ isBig ? 1 : 0 }}</p>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      isBig() {
        // Read isBig from localStorage
        const storedIsBig = localStorage.getItem('isBig');
        // Convert to boolean (default to false if not present in localStorage)
        return storedIsBig ? JSON.parse(storedIsBig) : false;
      },
    },
  };
  </script>