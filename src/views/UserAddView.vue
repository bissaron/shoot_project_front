<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <v-row justify="center">
      <v-col cols="12" xs="10" sm="10" md="12">
        <v-card style="padding: 20px">
          <v-container>
            <v-form @submit.prevent="addUser">
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <h2>{{ !showTextField ? "เพิ่มผู้ใช้" : "เพิ่มแอดมิน" }}</h2>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-model="user.role"
                    :items="roles"
                    label="บทบาท"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.username"
                    label="ชื่อผู้ใช้"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.password"
                    label="รหัสผ่าน"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.confirmPassword"
                    label="ยืนยันรหัสผ่าน"
                    type="password"
                    :rules="passwordMatchRule"
                  >
                    <template v-slot:error="{ messages }">
                      <span class="red--text">{{ messages.join(". ") }}</span>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.fname"
                    label="ชื่อจริง"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.lname"
                    label="นามสกุล"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="4" v-if="!showTextField">
                  <v-text-field
                    v-model="user.tel"
                    label="เบอร์มือถือ"
                    required
                    :rules="Rules.telephoneRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 10px">
              <v-btn color="primary" @click="addUser()">ยืนยัน</v-btn>
              <v-btn style="margin-left: 10px" @click="$router.go(-1)">ยกเลิก</v-btn>
            </div>
            </v-form>
          </v-container>
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
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        role: "customer",
        fname: "",
        lname: "",
        tel: "",
      },
      roles: ["customer", "admin"],
      passwordMatchRule: [
        (v) => !!v || "กรุณากรอกยืนยันรหัสผ่าน",
        (v) => v === this.user.password || "รหัสผ่านไม่ตรงกัน",
      ],
      Rules: {
        telephoneRules: [
          (v) => !!v || "กรุณากรอกหมายเลขโทรศัพท์",
          (v) =>
            /^0[0-9]{2}-[0-9]{3}-[0-9]{4}$/.test(v) ||
            "รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง (เช่น 099-999-9999)",
        ],
      },
      showTextField: false,
    };
  },
  watch: {
    "user.role": function (newRole) {
      if (newRole === "admin") {
        this.showTextField = true;
        console.log("admin");
      } else {
        this.showTextField = false;
        console.log("customer");
      }
    },
  },
  computed: {
    passwordsDoNotMatch() {
      return this.user.password !== this.user.confirmPassword;
    },
  },
  methods: {
    async addUser() {
      if (this.passwordsDoNotMatch) {
        Swal.fire({
          title: "รหัสผ่านไม่ตรงกัน!",
          icon: "error",
          // confirmButtonText: "ตกลง",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }

      try {
        let userData = {};
        if (this.user.role == "admin") {
          userData = {
            username: this.user.username,
            password: this.user.password,
            role: this.user.role,
            o_fname: this.user.fname,
            o_lname: this.user.lname,
          };
        } else {
          userData = {
            username: this.user.username,
            password: this.user.password,
            role: this.user.role,
            c_fname: this.user.fname,
            c_lname: this.user.lname,
            c_tel: this.user.tel,
          };
        }
        const response = await this.axios.post(
          process.env.VUE_APP_API_SERVER + `/user`,
          userData
        );
        if (response.status === 201) {
          Swal.fire({
            title: "เพิ่มผู้ใช้สำเร็จ!",
            // text: "คุณสมัครสมาชิกสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
            timer: 1500,
          });
          this.$router.go(-1);
        }
      } catch (error) {
        Swal.fire({
          title: "ชื่อผู้ใช้ไม่พร้อมใช้งาน!",
          icon: "error",
          text: "กรุณาใช้ชื่อผู้ใช้อื่น",
          confirmButtonText: "ตกลง",
        //   showConfirmButton: false,
        //   timer: 1000,
        });
        console.error("Registration error:", error);
        // You can display an error message to the user here
      }
    },
    getRole(value) {
      console.log("value", value);
    },
  },
};
</script>
