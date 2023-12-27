<template>
    <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายชื่อสนาม</h2>
    <v-row>
      <v-col
        style="display: flex; justify-content: flex-end; margin-bottom: 20px"
      >
        <v-btn color="var(--color-main)" to="/range/add">เพิ่มสนาม</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="indexedRangeItems"
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
          <!-- Your range edit form here -->
          <v-text-field
            v-model="editRange.s_name"
            label="ชื่อสนาม"
          ></v-text-field>
          <!-- Update other form fields accordingly -->

          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
              margin-top: 10px;
            "
          >
            <v-btn color="primary" @click="saveRangeChanges(editRange.s_id)"
              >บันทึก</v-btn
            >
            <v-btn style="margin-left: 10px" @click="cancelEdit"
              >ยกเลิก</v-btn
            >
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
      rangeItems: [], // Change the property name
      editRange: {}, // Rename this as well
      editDialog: false,
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "index",
        },
        {
          text: "ชื่อสนาม",
          align: "start",
          sortable: false,
          value: "s_name", // Update the value to 's_name'
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  created() {
    this.getAllRange();
  },

  computed: {
    indexedRangeItems() {
      return this.rangeItems.map((item, index) => {
        return { ...item, index: index + 1 };
      });
    },
  },

  methods: {
    async getAllRange() {
      try {
        const response = await this.axios.get(
          process.env.VUE_APP_API_SERVER + `/shootingranges` // Change the endpoint
        );
        if (response.status == 200) {
          this.rangeItems = response.data; // Update the property name
        }
      } catch (err) {
        console.error(err);
      }
    },

    async deleteItem(range) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการลบสนาม ${range.s_name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await this.axios.delete(
              process.env.VUE_APP_API_SERVER + `/shootingrange/${range.s_id}`
            );
            if (response.status === 200) {
              Swal.fire({
                title: "ลบสนามสำเร็จ!",
                // text: "คุณสมัครสมาชิกสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
                timer: 1500,
              });
              this.getAllRange();
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
      this.editRange = { ...item };
      this.editDialog = true;
    },

    async saveRangeChanges(rangeId) {
      let data = { s_name: this.editRange.s_name };

      try {
        const response = await this.axios.put(
          process.env.VUE_APP_API_SERVER + `/shootingrange/${rangeId}`,
          data
        );
        if (response.status === 200) {
          Swal.fire({
            title: "แก้ไขข้อมูลสนามสำเร็จ!",
            // text: "คุณสมัครสมาชิกสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
            timer: 1000,
          });
          this.getAllRange();
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
      this.editRange = {};
      this.editDialog = false;
    },
  },
};
</script>
