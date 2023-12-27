<template>
      <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
      <v-row justify="center">
        <v-col cols="12" xs="10" sm="10" md="12">
          <v-card style="padding: 20px">
            <v-container>
              <v-form @submit.prevent="addRange">
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <h2>เพิ่มสนาม</h2>
                  </v-col>
  
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="s_name"
                      label="ชื่อสนาม"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div
                  style="
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-top: 10px;
                  "
                >
                  <v-btn color="primary" @click="addRange()">ยืนยัน</v-btn>
                  <v-btn style="margin-left: 10px" @click="$router.go(-1)"
                    >ยกเลิก</v-btn
                  >
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
        s_name: "",
      };
    },
  
    methods: {
      async addRange() {
        try {
          const response = await this.axios.post(
            process.env.VUE_APP_API_SERVER + `/shootingrange`,
            { s_name: this.s_name }
          );
          if (response.status === 201) {
            Swal.fire({
              title: "เพิ่มสนามสำเร็จ!",
              // text: "คุณสมัครสมาชิกสำเร็จ",
              icon: "success",
              confirmButtonText: "ตกลง",
              timer: 1500,
            });
            this.$router.go(-1);
          }
        } catch (error) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            // text: "คุณสมัครสมาชิกสำเร็จ",
            icon: "error",
            confirmButtonText: "ตกลง",
            timer: 1500,
          });
          console.error("Registration error:", error);
          // You can display an error message to the user here
        }
      },
    },
  };
  </script>
  