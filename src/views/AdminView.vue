<template>
  <v-container >
    <v-row justify="center" style="margin-top: 20px">
      <h2>เมนูจัดการระบบ</h2>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" xs="10" sm="10" md="3">
        <a href="/user">
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
        </a>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <a href="/reserve">
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
        </a>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <a href="/gun">
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
        </a>
      </v-col>
      <v-col cols="12" xs="10" sm="10" md="3">
        <a href="/range">
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
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
a {
  text-decoration: none;
}

a:hover .card {
  background-color: var(--color-main);
}
</style>
