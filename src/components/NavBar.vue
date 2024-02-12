<template>
  <v-app-bar app color="#003C71" dark>
    <div
      class="d-flex align-center"
      style="flex: 1; justify-content: flex-start"
    >
      <div
        style="
          background-color: var(--color-white);
          border-radius: 100px;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 5px;
          margin-right: 10px;
        "
      >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          transition="scale-transition"
          width="50"
          
        />
      </div>
      <div
        class="shrink mt-1 hidden-sm-and-down"
        style="color: var(--color-white); font-weight: bold"
        contain
        min-width="100"
        width="100"
      >
        <h3>PSU Shooting Club</h3>
      </div>
    </div>

    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        flex: 1;
      "
    >
    <router-link to="/" style="margin-right: 25px; text-decoration: none; ">
        <span :class="{ active: $route.path === '/' }">หน้าแรก</span>
      </router-link>

      <v-btn to="/login" v-if="!isAuth">
        <span :class="{ active: $route.path === '/login' }">เข้าสู่ระบบ</span>
      </v-btn>
    </div>
    <template v-if="isAuth">
      <v-menu min-width="200px" rounded v-model="showMenu">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" @click="showMenu = !showMenu">
          
            {{ user.username }}
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="var(--color-main)">
                <v-icon color="var(--color-black)" dark
                  >mdi-account-circle</v-icon
                >
              </v-avatar>
              <p>{{ user.role }}</p>
              <h3>{{ user.username }}</h3>
              <h5>{{ user.fullname }}</h5>
              <span>{{ user.phone }}</span>
              <v-divider class="my-3" v-if="isAdmin"></v-divider>
              <v-btn variant="text" v-if="isAdmin" to="/admin">จัดการระบบ</v-btn>
              <v-divider class="my-3" v-if="!isAdmin"></v-divider>
              <v-btn variant="text" to="/reservedata" v-if="!isAdmin">ข้อมูลการจอง</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" @click="logout()"> ออกจากระบบ </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    auth: null,
    isAuth: false,
    isAdmin: false,
    showMenu: false,
    user: {
      initials: "",
      role: "",
      username: "",
      fullname: "",
      phone: "",
    },
  }),
  // computed: {
  //   user() {
  //     // You should replace this with actual user data if available
  //     return { initials: this.auth?.user?.username };
  //   },
  // },
  created() {
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.isAuth = this.auth !== null;
    this.isAdmin = this.auth.user.role === "admin";
    this.user.initials = "PP";
    this.user.username = this.auth.user.username;
    this.user.phone = this.auth.c_tel || null;
    this.getFullName();
  },
  methods: {
    async logout() {
      try {
        localStorage.clear("auth");
        window.location.href = "/";
      } catch (error) {
        // Handle the error, e.g., show an error message
        console.error("logout error:", error);
        // You can display an error message to the user here
      }
    },

    getFullName() {
      try {
        if (this.auth) {
          if (this.auth.user.role === "customer") {
            this.user.fullname = this.auth.c_fname + " " + this.auth.c_lname;
            this.user.role = "ลูกค้า";
          } else if (this.auth.user.role === "admin") {
            this.user.fullname = this.auth.a_fname + " " + this.auth.a_lname;
            this.user.role = "ผู้ดูแลระบบ";
          }
        }
      } catch (error) {
        console.error("Error in getFullName:", error);
        // Handle the error, e.g., set a default value for fullname
        this.fullname = "Unknown";
      }
    },
  },
};
</script>

<style scoped>

a span {
  text-decoration: none;
  color: var(--color-white);
}


</style>
