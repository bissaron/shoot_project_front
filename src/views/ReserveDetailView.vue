<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" class="back-button">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <v-row justify="center">
      <h2 class="header-title">ข้อมูลการจอง</h2>
    </v-row>
    <v-row justify="center">
      <h2 class="header-title">{{ auth.c_fname }}&nbsp;</h2>
      <h2 class="header-title">{{ auth.c_lname }}</h2>
    </v-row>

    <v-row justify="center">
  <v-col v-for="(reservation, index) in items" :key="index" cols="12" xs="12" sm="12" md="12">
    <v-card class="card">
      <v-card-title
        class="card-title"
        style="display: flex; justify-content: space-between"
        >{{ reservation.shootingRange.s_name }}
        <v-btn style="background-color: var(--color-red); color: var(--color-white)" @click="cancel(reservation.r_id)"
          >ยกเลิกการจอง</v-btn
        ></v-card-title
      >
      <v-card-text
        ><strong>วันที่จอง:</strong> {{ reservation.r_date_reserve }}</v-card-text
      >
      <v-card-text
        ><strong>เวลาที่จอง:</strong>
        {{ reservation.r_time_reserve }}</v-card-text
      >
      <v-card-text><strong>ปืน:</strong></v-card-text>
      <v-card-text
        v-for="gun in reservation.guns"
        :key="gun.id"
        style="display: inline"
        >{{ gun }}</v-card-text
      >
  
</v-card>

      </v-col>
      
    </v-row>
  </v-container>
</template>
<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      auth: "",
      c_id: null,
      items: null,
    };
  },
  created() {
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.c_id = this.auth.c_id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
  try {
    const response = await this.axios.get(
      process.env.VUE_APP_API_SERVER + `/reserves`
    );
    if (response.status === 200) {
      const allReservations = response.data;
      const userReservations = allReservations.filter(
        (item) => item.customer.c_id === this.c_id
      );
      const uniqueReservations = [];
      const uniqueIds = [];
      
      userReservations.forEach((reservation) => {
        if (!uniqueIds.includes(reservation.r_id)) {
          uniqueIds.push(reservation.r_id);
          uniqueReservations.push(reservation);
        }
      });
      
      this.items = uniqueReservations;
      console.log("items", this.items);
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
},

    async cancel(Rid) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการยกเลิกการจอง?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await this.axios.delete(
              process.env.VUE_APP_API_SERVER + `/reserve/${Rid}`
            );
            if (response.status === 200) {
              Swal.fire({
                title: "ยกเลิกกาารจองสำเร็จ!",
                // text: "คุณสมัครสมาชิกสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
                timer: 1500,
              }).then(() => window.location.reload());
            }
          } catch (err) {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              // text: "คุณสมัครสมาชิกสำเร็จ",
              icon: "error",
              confirmButtonText: "ตกลง",
              timer: 1500,
            });
            console.error(err);
          }
        }
      });
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}

a:hover .card {
  background-color: var(--color-main);
}
.back-button {
  margin-bottom: 20px;
}

.header-title {
  font-size: 24px;
  color: #333;
}

.card {
  margin: 20px;
  padding: 20px;
  padding-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
}

.no-data-card {
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: #f0f0f0; /* กำหนดสีพื้นหลัง */
  display: flex;
  justify-content: center;
  text-align: center;
  color: #333; /* กำหนดสีข้อความ */
}



</style>