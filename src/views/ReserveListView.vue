<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายการการจองสนาม</h2>
    <v-row>
      <v-col
        style="display: flex; justify-content: flex-end; margin-bottom: 20px"
      >
        <!-- <v-btn color="var(--color-main)" to="/gun/add">เพิ่มปืน</v-btn> -->
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="indexedGunItems"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)"> mdi-eye </v-icon>
        <v-icon small @click="deleteItem(item.r_id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="editDialog" max-width="600px" style="height: 100%">
      <v-card class="card">
        <v-card-title><h4>รายละเอียด</h4></v-card-title>
        <v-card-text
          ><strong>สนามที่จอง:</strong>
          {{ editGun?.shootingRange?.s_name }}</v-card-text
        >
        <v-card-text
          ><strong>วันที่จอง:</strong>
          {{ editGun?.r_date_reserve }}</v-card-text
        >
        <v-card-text
          ><strong>เวลาที่จอง:</strong>
          {{ editGun?.r_time_reserve }}</v-card-text
        >
        <v-card-text><strong>ปืน:</strong></v-card-text>
        <v-card-text
          v-for="gun in editGun?.guns"
          :key="gun.g_id"
          style="display: inline"
          >{{ gun }},</v-card-text
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      gunItems: [],
      editGun: {},
      editDialog: false,
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "index",
        },
        {
          text: "สนาม",
          align: "start",
          sortable: true,
          value: "shootingRange.s_name",
        },
        {
          text: "วันที่จอง",
          align: "start",
          sortable: true,
          value: "r_date_reserve",
        },
        {
          text: "เวลาที่จอง",
          align: "start",
          sortable: true,
          value: "r_time_reserve",
        },
        {
          text: "ชื่อจริง",
          align: "start",
          sortable: true,
          value: "customer.c_fname",
        },
        {
          text: "นามสกุล",
          align: "start",
          sortable: true,
          value: "customer.c_lname",
        },
        {
          text: "เบอร์มือถือ",
          align: "start",
          sortable: false,
          value: "customer.c_tel",
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  created() {
    this.getAllGun();
  },

  computed: {
    indexedGunItems() {
      return this.gunItems.map((item, index) => {
        return { ...item, index: index + 1 };
      });
    },
  },

  methods: {
    async getAllGun() {
      try {
        const response = await this.axios.get(
          process.env.VUE_APP_API_SERVER + `/reserves`
        );
        if (response.status == 200) {
          this.gunItems = response.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async deleteItem(Rid) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการลบการจอง?`,
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
                title: "ลบกาารจองสำเร็จ!",
                // text: "คุณสมัครสมาชิกสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
                timer: 1500,
              });
              this.getAllGun();
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

    editUser(item) {
      this.editGun = { ...item };
      console.log("this.editGun", this.editGun);
      this.editDialog = true;
    },

    async saveUserChanges(gunId) {
      let gunData = { g_name: this.editGun.g_name };

      try {
        const response = await this.axios.put(
          process.env.VUE_APP_API_SERVER + `/gun/${gunId}`,
          gunData
        );
        if (response.status === 200) {
          Swal.fire({
            title: "แก้ไขข้อมูลปืนสำเร็จ!",
            // text: "คุณสมัครสมาชิกสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
            timer: 1000,
          });
          this.getAllGun();
        }

        this.editDialog = false;
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          // text: "คุณสมัครสมาชิกสำเร็จ",
          icon: "error",
          confirmButtonText: "ตกลง",
          timer: 1500,
        });

        console.error("error:", error);
      }
    },
    cancelEdit() {
      // Reset the editGun and close the dialog
      this.editGun = {};
      this.editDialog = false;
    },
  },
};
</script>

<style scoped>
.card {
  /* margin: 20px; */
  padding: 20px;
  padding-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  height: 100%;
}
</style>
