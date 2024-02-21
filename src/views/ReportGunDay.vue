<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายงาน</h2>
    <canvas id="weeklyUsageChart" style="max-height: 400px;"></canvas>

    <v-row>
 
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
      weeklyUsage: {} // จำนวนการใช้งานต่อสัปดาห์
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
          this.calculateWeeklyUsage();
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
    calculateWeeklyUsage() {
  this.weeklyUsage = {}; // เริ่มต้นตารางเป็นช่องว่างทั้งหมด

  this.reservations.forEach(reservation => {
    const date = new Date(reservation.r_date_reserve);
    const dayIndex = date.getDay(); // ดึงวันในสัปดาห์เป็นหมายเลขลำดับ
    const dayName = this.convertToDayName(dayIndex); // แปลงวันในสัปดาห์เป็นชื่อของวัน

    if (!this.weeklyUsage[dayName]) {
      // หากยังไม่มีข้อมูลวันในตาราง ให้สร้าง
      this.weeklyUsage[dayName] = {};
    }

    // ดึงชื่อปืน
    const guns = reservation.guns;

    guns.forEach(gunName => {
      if (!this.weeklyUsage[dayName][gunName]) {
        // หากยังไม่มีข้อมูลปืนนี้ในเดือนนี้ ให้เพิ่มเข้าไปใหม่
        this.weeklyUsage[dayName][gunName] = 1;
      } else {
        // หากมีแล้ว ให้เพิ่มจำนวนการใช้งาน
        this.weeklyUsage[dayName][gunName]++;
      }
    });
    
  });
},
convertToDayName(dayIndex) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayNames[dayIndex];
},


async renderChart() {
  const ctx = document.getElementById('weeklyUsageChart').getContext('2d');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // กำหนดวันทั้ง 7 วัน
  const guns = await this.getGuns(); // ดึงข้อมูลปืน
  const datasets = [];

  const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];

  guns.forEach((gun, index) => {
    const counts = days.map(day => {
      const dailyData = this.weeklyUsage[day];
      if (dailyData && dailyData[gun.g_name]) {
        return dailyData[gun.g_name];
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
      labels: days,
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
