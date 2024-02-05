<template>
  <v-carousel hide-delimiters cycle>
    <v-carousel-item
      src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t39.30808-6/350791073_513752807512379_4299316243297105373_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=52f669&_nc_eui2=AeFB9CV6MAXmlOW9-PIGvg79kLvZJaZ24WaQu9klpnbhZl2i0q7D1Ahc66S3QjASlBHgp1Z39zSc9_KBebTvlwLS&_nc_ohc=JeieCP9lgawAX8XKdjK&_nc_ht=scontent.fbkk10-1.fna&oh=00_AfCs30CRTHBZI5TaFp6_KbqSlyIYI64IFmoicDbdCkCicg&oe=652DB59A"
    >
      <div class="text-overlay">
        <h1>SSC Club Dannok</h1>
        <p>
          Shooting Range "SSC Club Dannok" THAI-JANGLON SOI 6 , SADAO SONGKHLA ,
          THAILAND
        </p>
      </div></v-carousel-item
    >
    <v-carousel-item
      src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t39.30808-6/350523264_1899378380418209_8555751663830626637_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeERUN-EBcL4T75ZR_Fm6OuzYOSpSUtXGDtg5KlJS1cYOwX54di05FJ-yJC9szOyWRIGp1kRecz9QT2__2Gqm0QC&_nc_ohc=u7nRnJjNAkgAX-1sYzF&_nc_ht=scontent.fbkk10-1.fna&oh=00_AfBjbpnefljRCJq_KmxLDTL60ZARBoeWRlC_JujeyeTHuQ&oe=652D28AE"
    >
      <div class="text-overlay">
        <h1>SSC Club Dannok</h1>
        <p>
          Shooting Range "SSC Club Dannok" THAI-JANGLON SOI 6 , SADAO SONGKHLA ,
          THAILAND
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
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  /* border-radius: 5px; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  font-size: 50px;
  color: var(--color-main);
}
</style>
