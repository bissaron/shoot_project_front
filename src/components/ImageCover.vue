<template>
  <v-carousel hide-delimiters cycle>
    <v-carousel-item
    >
      <div class="text-overlay">
        <img src="../assets/logoclub.png" alt="logo" height="400px" > 
        
      </div></v-carousel-item
    >
    <v-carousel-item
    >
      <div class="text-overlay">
        <h1>🚨25 ธ.ค. 66 สนามปิดทำการ 🚨</h1>
        <p>
          เนื่องจากสภาพอากาศไม่เอื้ออำนวย🌧️
        </p> 
      </div></v-carousel-item
    >
  </v-carousel>
</template>

<script>
export default {
  name: "ImageCover",
};
</script>

<style scoped>
.text-overlay {
  position: absolute;
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  color: white;
  padding: 10px;
  /* border-radius: 5px; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #315DAE;
}
h1 {
  font-size: 50px;
  color: var(--color-main);
}
</style>
