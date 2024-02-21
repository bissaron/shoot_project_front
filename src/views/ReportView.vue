<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px;">
        <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
      </v-btn>
    <v-row justify="center" style="margin-top: 40px">
      <h2>รายงาน</h2>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/reportrangemonth">
          <v-card
            style="
              margin: 20px;
              height: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            class="card"
          >
            <v-card-title>สนาม(เดือน)</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/reportrangeday">
          <v-card
            style="
              margin: 20px;
              height: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            class="card"
          >
            <v-card-title>สนาม(วัน)</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/reportgunmonth">
          <v-card
            style="
              margin: 20px;
              height: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            class="card"
          >
            <v-card-title>ปืน(เดือน)</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/reportgunday">
          <v-card
            style="
              margin: 20px;
              height: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            class="card"
          >
            <v-card-title>ปืน(วัน)</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/reporttimemonth">
          <v-card
            style="
              margin: 20px;
              height: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            class="card"
          >
            <v-card-title>เวลา(เดือน)</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/reporttimeday">
          <v-card
            style="
              margin: 20px;
              height: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            class="card"
          >
            <v-card-title>เวลา(วัน)</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/reportreserveall">
          <v-card
            style="
              margin: 20px;
              height: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            class="card"
          >
            <v-card-title>การจองทั้งหมด</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/reportreserveallmonthday">
          <v-card
            style="
              margin: 20px;
              height: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            class="card"
          >
            <v-card-title>การจองทั้งหมด</v-card-title>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
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


<style scoped>
a {
  text-decoration: none;
}

a:hover .card {
  background-color: var(--color-main);
}
</style>
