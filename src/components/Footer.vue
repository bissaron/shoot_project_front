<template>
  <v-footer>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            &copy; {{ new Date().getFullYear() }} PSU Shooting Club | ติดต่อ <a href="https://www.facebook.com/psushootingclub" target="_blank"  style="text-decoration: none; color: #ffffff;">
              <img src="../assets/logofacebook.png" alt="Facebook" width="20" height="20"> 
              PSU Shooting Club 
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.v-footer {
  color: white; /* ตั้งค่าสีข้อความใน footer เป็นขาว */
  background-color: #315DAE;
}
</style>
