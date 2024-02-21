<template >
  <v-container fluid>
    <v-row justify="center" >
      <v-col cols="12" xs="10" sm="10" md="4" >
        <v-card style="margin: 20px;">
          <v-container>
            <v-card-title>{{
              isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"
            }}</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="isLogin ? login : register">
                <v-text-field
                  v-model="username"
                  label="ชื่อผู้ใช้"
                  required
                  :rules="Rules.usernameRules"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="รหัสผ่าน"
                  type="password"
                  required
                  :rules="Rules.passwordRules"
                ></v-text-field>
                <!-- Confirmation password field with matching rule -->
                <v-text-field
                  v-model="confirmPassword"
                  label="ยืนยันรหัสผ่าน"
                  type="password"
                  v-if="!isLogin"
                  :rules="passwordMatchRule"
                >
                  <template v-slot:error="{ messages }">
                    <span class="red--text">{{ messages.join(". ") }}</span>
                  </template>
                </v-text-field>
                <!-- Additional registration fields with rules -->
                <v-text-field
                  v-model="firstName"
                  label="ชื่อจริง"
                  required
                  v-if="!isLogin"
                  :rules="Rules.firstNameRules"
                ></v-text-field>
                <v-text-field
                  v-model="lastName"
                  label="นามสกุล"
                  required
                  v-if="!isLogin"
                  :rules="Rules.lastNameRules"
                ></v-text-field>
                <v-text-field
                  v-model="telephone"
                  label="เบอร์มือถือ"
                  required
                  v-if="!isLogin"
                  :rules="Rules.telephoneRules"
                ></v-text-field>

                <v-col style="display: flex; justify-content: center; align-items: center;">
                  <v-btn
                    color="primary"
                    @click="isLogin ? login() : register()"
                  >
                    {{ isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก" }}
                  </v-btn>
                </v-col>
                <v-col style="display: flex; justify-content: flex-end; align-items: center;">
                  <a @click="toggleView">{{
                    isLogin ? "สมัครสมาชิก" : "เข้าสู่ระบบ"
                  }}</a>
                </v-col>
              </v-form>
            </v-card-text>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      telephone: "",
      isLogin: true,
      Rules: {
        usernameRules: [(v) => !!v || "กรุณากรอกชื่อผู้ใช้งาน"],
        passwordRules: [(v) => !!v || "กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัว"],
        firstNameRules: [(v) => !!v || "กรุณากรอกชื่อ"],
        lastNameRules: [(v) => !!v || "กรุณากรอกนามสกุล"],
        telephoneRules: [
          (v) => !!v || "กรุณากรอกหมายเลขโทรศัพท์",
          (v) =>
            /^0[0-9]{2}-[0-9]{3}-[0-9]{4}$/.test(v) ||
            "รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง กรุณากรอกรูปแบบ 099-999-9999)",
        ],
      },
      passwordMatchRule: [
        (v) => !!v || "กรุณากรอกยืนยันรหัสผ่าน",
        (v) => v === this.password || "รหัสผ่านไม่ตรงกัน",
      ],
    };
  },
  methods: {
    async login() {
      try {
        const data = { username: this.username, password: this.password };
        const response = await this.axios.post(
          process.env.VUE_APP_API_SERVER + `/login`,
          data
        );
        if (response.status === 200) {
          localStorage.setItem("auth", JSON.stringify(response.data));
          this.$router.push("/").then(()=>window.location.reload())
        }
      } catch (error) {
        Swal.fire({
            title: "เข้าสู่ระบบไม่สำเร็จ!",
            text: "โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่านอีกครั้ง",
            icon: "error",
            confirmButtonText: "ตกลง",
            // timer: 1500
          })
        console.error("Login error:", error);
        // You can display an error message to the user here
      }
    },

    async register() {
  // Check if password length is valid, password matches, and all fields are provided
  if (this.password.length < 6) {
    Swal.fire({
      title: 'รหัสผ่านสั้นเกินไป',
      text: 'รหัสผ่านควรมีอย่างน้อย 6 ตัว',
      icon: 'error',
      confirmButtonText: 'ตกลง',
    });
    return;
  }

  if (this.password !== this.confirmPassword) {
    Swal.fire({
      title: 'รหัสผ่านไม่ตรงกัน',
      text: 'กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน',
      icon: 'error',
      confirmButtonText: 'ตกลง',
    });
    return;
  }

  // Check if all fields are provided
  if (!this.username || !this.password || !this.telephone || !this.firstName || !this.lastName) {
    Swal.fire({
      title: 'ข้อมูลไม่ครบ',
      text: 'กรุณากรอกข้อมูลให้ครบ',
      icon: 'warning',
      confirmButtonText: 'ตกลง',
    });
    return;
  }

  // Validate phone number format
  const phoneRegex = /^0[0-9]{2}-[0-9]{3}-[0-9]{4}$/;
  if (!phoneRegex.test(this.telephone)) {
    Swal.fire({
      title: 'รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง',
      text: 'โปรดระบุหมายเลขโทรศัพท์ให้ถูกต้อง (เช่น 099-999-9999)',
      icon: 'error',
      confirmButtonText: 'ตกลง',
    });
    return;
  }

  // Fetch existing users data from the server
  try {
    const response = await this.axios.get(process.env.VUE_APP_API_SERVER + '/user');
    const existingUsers = response.data;

    // Check if the provided username, first name, last name, or telephone already exists
    const usernameExists = existingUsers.some(user => user.username === this.username);
    const firstNameExists = existingUsers.some(user => user.fname === this.firstName);
    const lastNameExists = existingUsers.some(user => user.lname === this.lastName);
    const telephoneExists = existingUsers.some(user => user.c_tel === this.telephone);

    if (usernameExists || firstNameExists || lastNameExists || telephoneExists) {
  let errorMessage = 'ข้อมูลซ้ำ:';
  if (usernameExists) {
    errorMessage += '\n ชื่อผู้ใช้';
  }
  if (firstNameExists) {
    errorMessage += '\n ชื่อ';
  }
  if (lastNameExists) {
    errorMessage += '\n นามสกุล';
  }
  if (telephoneExists) {
    errorMessage += '\n หมายเลขโทรศัพท์';
  }

  Swal.fire({
    title: 'ข้อมูลซ้ำ',
    html: errorMessage,
    icon: 'error',
    confirmButtonText: 'ตกลง'
  });
  return;
}

    // If no duplicates, proceed with registration
    const data = {
      username: this.username,
      password: this.password,
      role: 'customer',
      c_fname: this.firstName,
      c_lname: this.lastName,
      c_tel: this.telephone,
    };
    const registerResponse = await this.axios.post(process.env.VUE_APP_API_SERVER + '/register', data);

    if (registerResponse.status === 201) {
      Swal.fire({
        title: 'สมัครสมาชิกสำเร็จ!',
        text: 'คุณสมัครสมาชิกสำเร็จ',
        icon: 'success',
        confirmButtonText: 'ตกลง',
      }).then(() => window.location.reload());
    }
  } catch (error) {
    Swal.fire({
      title: 'เกิดข้อผิดพลาด!',
      icon: 'error',
      confirmButtonText: 'ตกลง',
      timer: 1500,
    });
    console.error('Registration error:', error);
    // You can display an error message to the user here
  }
},


    toggleView() {
      this.isLogin = !this.isLogin;
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
      this.firstName = "";
      this.lastName = "";
      this.telephone = "";
    },
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
  color: var(--color-main);
}
</style>