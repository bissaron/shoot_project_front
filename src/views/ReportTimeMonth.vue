<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายงาน</h2>
    <canvas id="usageChart" style="max-height: 400px;"></canvas>
    
  </v-container>
</template>

<script>
import moment from 'moment'; // นำเข้าไลบรารี moment.js
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      reservations: [], // ข้อมูลการจอง
      usageData: {} // จำนวนการใช้งานตามวันในสัปดาห์
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
        const response = await this.axios.get(process.env.VUE_APP_API_SERVER + `/reserves`);
        if (response.status === 200) {
          // กำหนดข้อมูลการจองให้กับตัวแปร reservations
          this.reservations = response.data;
          // คำนวณจำนวนการใช้งานตามวันในสัปดาห์
          this.calculateUsageData();
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },

    calculateUsageData() {
  this.usageData = {}; // เริ่มต้นตารางเป็นช่องว่างทั้งหมด

  this.reservations.forEach(reservation => {
    const date = new Date(reservation.r_date_reserve);
    const monthIndex = date.getMonth(); // ดึงเดือนเป็นหมายเลขลำดับ
    const monthName = moment.monthsShort(monthIndex); // แปลงเดือนเป็นชื่อย่อ
    const dayIndex = moment(date).format('dddd'); // ดึงชื่อวันในสัปดาห์
    const timeSlot = reservation.r_time_reserve; // ดึงเวลาการจอง

    if (!this.usageData[monthName]) {
      this.usageData[monthName] = {};
    }

    if (!this.usageData[monthName][dayIndex]) {
      this.usageData[monthName][dayIndex] = {};
    }

    if (!this.usageData[monthName][dayIndex][timeSlot]) {
      this.usageData[monthName][dayIndex][timeSlot] = 0;
    }

    this.usageData[monthName][dayIndex][timeSlot]++;
  });
},

async renderChart() {
  const ctx = document.getElementById('usageChart').getContext('2d');
  const timeSlots = [
    "17:00 - 17:15",
    "17:15 - 17:30",
    "17:30 - 17:45",
    "17:45 - 18:00",
    "18:00 - 18:15",
    "18:15 - 18:30",
    "18:30 - 18:45",
    "18:45 - 19:00",
    "19:00 - 19:15",
    "19:15 - 19:30",
    "19:30 - 19:45",
    "19:45 - 20:00",
    "20:00 - 20:15",
    "20:15 - 20:30",
  ];
  const months = moment.monthsShort(); // เรียกชื่อเดือนทั้ง 12 ออกมา
  const counts = Array.from({ length: months.length }, () => Array(timeSlots.length).fill(0));
  const colors = [
  'rgba(199, 21, 133, 0.2)',    // วันอาทิตย์
  'rgba(138, 43, 226, 0.2)',    // วันจันทร์
  'rgba(138, 43, 226, 0.2)',    // วันอังคาร
  'rgba(0, 0, 255, 0.2)',       // วันพุธ
  'rgba(0, 255, 255, 0.2)',     // วันพฤหัสบดี
  'rgba(0, 128, 0, 0.2)',       // วันศุกร์
  'rgba(154, 205, 50, 0.2)',    // วันเสาร์
  'rgba(255, 255, 0, 0.2)',     // วันอาทิตย์
  'rgba(255, 215, 0, 0.2)',     // วันจันทร์
  'rgba(255, 165, 0, 0.2)',     // วันอังคาร
  'rgba(255, 69, 0, 0.2)',      // วันพุธ
  'rgba(255, 0, 0, 0.2)'             // วันพฤหัสบดี
  ];

  months.forEach((month, i) => {
  if (this.usageData[month]) {
    Object.values(this.usageData[month]).forEach(day => {
      Object.keys(day).forEach((timeSlot, j) => {
        counts[i][timeSlots.indexOf(timeSlot)] += day[timeSlot];
      });
    });
  }
});


  if (this.chart) {
    this.chart.destroy(); // ทำลายกราฟที่มีอยู่
  }

  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: timeSlots,
      datasets: months.map((month, i) => ({
  label: month,
  data: counts[i],
  backgroundColor: colors[i] || 'rgba(0, 0, 0, 0.2)', // ใช้สีดำหากไม่มีข้อมูลสี
  borderColor: colors[i] ? colors[i].replace('0.2', '1') : 'rgba(0, 0, 0, 1)', // ใช้สีดำหากไม่มีข้อมูลสี
  borderWidth: 1
}))


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
