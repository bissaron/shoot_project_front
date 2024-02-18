<template>
  <v-container>
    
    <v-row justify="center" style="margin-top: 130px">
      <h2>เมนูจัดการระบบ</h2>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/user">
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
            <v-card-title>ผู้ใช้</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/reserve">
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
            <v-card-title>การจอง</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/gun">
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
            <v-card-title>ปืน</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/range">
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
            <v-card-title>สนาม</v-card-title>
          </v-card>
        </router-link>
      </v-col>
      
      <v-col cols="12" xs="10" sm="10" md="3">
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
          <v-card-title>สถานะฝนตก</v-card-title>
          <v-switch v-model="isBig" color="success" @change="toggleIsBig"></v-switch>
        </v-card>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <router-link to="/report">
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
            <v-card-title>รายงาน</v-card-title>
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
