<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายงาน</h2>
<<<<<<< HEAD
    <canvas id="monthlyUsageChart" style="max-height: 400px;"></canvas>

    <v-row>
 
=======
    <canvas id="monthlyUsageChart"></canvas>

    <v-row>
  <v-col cols="12" sm="6" md="4" v-for="month in ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']" :key="month">
    <v-card>
      <v-card-text>
        <h3>{{ month }}</h3>
        <p>จำนวนการใช้งาน: {{ monthlyUsage[month] || 0 }}</p>
      </v-card-text>
    </v-card>
  </v-col>
>>>>>>> 46184d5b162f3ed5471fa5bd8e6f910e93c39b25
</v-row>

  </v-container>
</template>

<script>
import moment from 'moment'; // นำเข้าไลบรารี moment.js
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      reservations: [], // ข้อมูลการจอง
      monthlyUsage: {} // จำนวนการใช้งานต่อเดือน
    };
  },
  created() {
    // ดึงข้อมูลการจอง
    this.getReservations().then(() => {
      // เมื่อข้อมูลการจองถูกดึงมาแล้ว ก็สร้างกราฟ
      this.renderChart();
    });
  },
  methods: {
    async getReservations() {
      try {
        // ดึงข้อมูลการจองจาก API หรือฐานข้อมูล
        const response = await this.axios.get(
          `http://localhost:9000/reserves`
        );
        if (response.status === 200) {
          // กำหนดข้อมูลการจองให้กับตัวแปร reservations
          this.reservations = response.data;
          // คำนวณจำนวนการจองต่อเดือน
          this.calculateMonthlyUsage();
          this.renderChart(); // เรียกใช้ฟังก์ชัน renderChart() ที่นี่
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    async getGuns() {
      try {
        const response = await this.axios.get(
          'http://localhost:9000/guns'
        );
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.error('Error fetching guns:', error);
        return [];
      }
    },
    calculateMonthlyUsage() {
      this.monthlyUsage = {}; // เริ่มต้นตารางเป็นช่องว่างทั้งหมด

      this.reservations.forEach(reservation => {
        const date = new Date(reservation.r_date_reserve);
        const monthIndex = date.getMonth(); // ดึงเดือนเป็นหมายเลขลำดับ
        const monthName = moment.monthsShort(monthIndex); // แปลงเดือนเป็นชื่อย่อ

        if (!this.monthlyUsage[monthName]) {
          // หากยังไม่มีข้อมูลเดือนในตาราง ให้สร้าง
          this.monthlyUsage[monthName] = {};
        }

        // ดึงชื่อปืน
        const guns = reservation.guns;

        guns.forEach(gunName => {
          if (!this.monthlyUsage[monthName][gunName]) {
            // หากยังไม่มีข้อมูลปืนนี้ในเดือนนี้ ให้เพิ่มเข้าไปใหม่
            this.monthlyUsage[monthName][gunName] = 1;
          } else {
            // หากมีแล้ว ให้เพิ่มจำนวนการใช้งาน
            this.monthlyUsage[monthName][gunName]++;
          }
        });
      });
    },
    async renderChart() {
  const ctx = document.getElementById('monthlyUsageChart').getContext('2d');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // กำหนดเดือนทั้ง 12 เดือน
  const guns = await this.getGuns(); // ดึงข้อมูลปืน
  const datasets = [];

  const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];

  guns.forEach((gun, index) => {
    const counts = months.map(month => {
      const monthlyData = this.monthlyUsage[month];
      if (monthlyData && monthlyData[gun.g_name]) {
        return monthlyData[gun.g_name];
      } else {
        return 0;
      }
    });

    datasets.push({
      label: gun.g_name,
      data: counts,
      backgroundColor: colors[index],
      borderColor: colors[index].replace('0.2', '1'), // เปลี่ยนค่า alpha เพื่อทำให้เข้มขึ้น
      borderWidth: 1
    });
  });

  if (this.chart) {
    this.chart.destroy(); // ทำลายกราฟที่มีอยู่
  }

  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: datasets
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>
