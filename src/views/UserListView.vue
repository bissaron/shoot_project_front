<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>

    <h2>รายชื่อผู้ใช้ระบบ</h2>
    <v-row>
      <v-col
        style="display: flex; justify-content: flex-end; margin-bottom: 20px"
      >
        <v-btn color="var(--color-main)" to="/user/add">เพิ่มผู้ใช้</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="indexedUserItems"
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
            v-model="editedUser.username"
            label="ชื่อผู้ใช้"
          ></v-text-field>
          <v-text-field
            v-model="editedUser.password"
            label="รหัสผ่าน"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="editedUser.fname"
            label="ชื่อจริง"
          ></v-text-field>
          <v-text-field
            v-model="editedUser.lname"
            label="นามสกุล"
          ></v-text-field>
          <v-text-field
            v-if="editedUser.c_tel !== '-'"
            v-model="editedUser.c_tel"
            label="เบอรืมือถือ"
          ></v-text-field>
          <!-- <v-select
                    v-model="editedUser.role"
                    :items="roles"
                    label="บทบาท"
                    required
                  ></v-select> -->
          <!-- Add other fields for editing -->

          <!-- Save and Cancel buttons -->
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
              margin-top: 10px;
            "
          >
            <v-btn color="primary" @click="saveUserChanges(editedUser.u_id)"
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
      userItems: [],
      editedUser: {},
      editDialog: false,
      roles: ["customer", "owner"],
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "index",
        },
        {
          text: "ชื่อผู้ใช้",
          align: "start",
          sortable: false,
          value: "username",
        },
        { text: "ชื่อจริง", align: "start", sortable: false, value: "fname" },
        { text: "นามสกุล", align: "start", value: "lname" },
        { text: "เบอร์มือถือ", align: "start", value: "c_tel" },
        { text: "บทบาท", align: "start", value: "role" },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  created() {
    this.getAllUser();
  },

  computed: {
    indexedUserItems() {
      return this.userItems.map((user, index) => {
        return { ...user, index: index + 1, c_tel: user.c_tel || "-" };
      });
    },
  },

  methods: {
    async getAllUser() {
      try {
        const response = await this.axios.get(
          process.env.VUE_APP_API_SERVER + `/user`
        );
        if (response.status == 200) {
          this.userItems = response.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async deleteItem(user) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการลบชื่อผู้ใช้ ${user.username}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await this.axios.delete(
              process.env.VUE_APP_API_SERVER + `/user/${user.u_id}`
            );
            if (response.status === 200) {
              Swal.fire({
                title: "ลบผู้ใช้สำเร็จ!",
                // text: "คุณสมัครสมาชิกสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
                timer: 1500,
              });
              this.getAllUser();
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
    editUser(user) {
      this.editedUser = { ...user };
      this.editDialog = true;
      console.log(this.editedUser);
    },
    async saveUserChanges(userId) {
      let userData = {};
      if (this.editedUser.role == "owner") {
        userData = {
          username: this.editedUser.username,
          password: this.editedUser.password,
          role: this.editedUser.role,
          o_fname: this.editedUser.fname,
          o_lname: this.editedUser.lname,
        };
      } else {
        userData = {
          username: this.editedUser.username,
          password: this.editedUser.password,
          role: this.editedUser.role,
          c_fname: this.editedUser.fname,
          c_lname: this.editedUser.lname,
          c_tel: this.editedUser.c_tel,
        };
      }
      console.log("userData", userData);
      console.log("userId", userId);
      try {
        const response = await this.axios.put(
          process.env.VUE_APP_API_SERVER + `/user/${userId}`,
          userData
        );
        if (response.status === 200) {
          Swal.fire({
            title: "แก้ไขข้อมูลผู้ใช้สำเร็จ!",
            // text: "คุณสมัครสมาชิกสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
            timer: 1000,
          });
          this.getAllUser();
          this.editDialog = false;
        }

        console.log(userData);
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
      // Reset the editedUser and close the dialog
      this.editedUser = {};
      this.editDialog = false;
    },
  },
};
</script>
