<template>
    <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายชื่อปืน</h2>
    <v-row>
      <v-col
        style="display: flex; justify-content: flex-end; margin-bottom: 20px"
      >
        <v-btn color="var(--color-main)" to="/gun/add">เพิ่มปืน</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="indexedGunItems"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="editDialog" max-width="600px">
      <v-card>
        <v-card-title>แก้ไขข้อมูล</v-card-title>
        <v-card-text>
          <!-- Your user edit form here -->
          <v-text-field
            v-model="editGun.g_name"
            label="ชื่อปืน"
          ></v-text-field>

          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
              margin-top: 10px;
            "
          >
            <v-btn color="primary" @click="saveUserChanges(editGun.g_id)"
              >บันทึก</v-btn
            >
            <v-btn style="margin-left: 10px" @click="cancelEdit">ยกเลิก</v-btn>
          </div>
        </v-card-text>
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
          text: "ชื่อปืน",
          align: "start",
          sortable: false,
          value: "g_name",
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
        return { ...item, index: index + 1, };
      });
    },
  },

  methods: {
    async getAllGun() {
      try {
        const response = await this.axios.get(
          process.env.VUE_APP_API_SERVER + `/guns`
        );
        if (response.status == 200) {
          this.gunItems = response.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async deleteItem(gun) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการลบปืน ${gun.g_name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await this.axios.delete(
              process.env.VUE_APP_API_SERVER + `/gun/${gun.g_id}`
            );
            if (response.status === 200) {
              Swal.fire({
                title: "ลบปืนสำเร็จ!",
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
