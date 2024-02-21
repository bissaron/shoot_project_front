<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายงาน</h2>
    <canvas id="monthlyUsageChart" style="max-height: 400px;"></canvas>

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
  async getShootingRanges() {
  try {
    const response = await this.axios.get(
      'http://localhost:9000/shootingranges'
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching shooting ranges:', error);
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

    // ดึงชื่อสนามยิง
    const shootingRangeName = reservation.shootingRange.s_name;

    if (!this.monthlyUsage[monthName][shootingRangeName]) {
      // หากยังไม่มีข้อมูลสนามนี้ในเดือนนี้ ให้เพิ่มเข้าไปใหม่
      this.monthlyUsage[monthName][shootingRangeName] = 1;
    } else {
      // หากมีแล้ว ให้เพิ่มจำนวนการใช้งาน
      this.monthlyUsage[monthName][shootingRangeName]++;
    }
  });
},

async renderChart() {
  const ctx = document.getElementById('monthlyUsageChart').getContext('2d');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // กำหนดเดือนทั้ง 12 เดือน
  const shootingRanges = await this.getShootingRanges(); // ดึงข้อมูลสนามยิง
  const datasets = [];
  const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)']; // เพิ่มสีตามจำนวนสนาม

  shootingRanges.forEach((shootingRange, index) => {
    const counts = months.map(month => {
      const monthlyData = this.monthlyUsage[month];
      if (monthlyData && monthlyData[shootingRange.s_name]) {
        return monthlyData[shootingRange.s_name];
      } else {
        return 0;
      }
    });

    datasets.push({
      label: shootingRange.s_name,
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
