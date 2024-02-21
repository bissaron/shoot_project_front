<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายงาน</h2>
<<<<<<< HEAD
    <canvas id="weeklyUsageChart" style="max-height: 400px;"></canvas>

    <v-row>
  
=======
    <canvas id="weeklyUsageChart"></canvas>

    <v-row>
  <v-col cols="12" sm="6" md="4" v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="day">
    <v-card>
      <v-card-text>
        <h3>{{ day }}</h3>
        <p>จำนวนการใช้งาน: {{ weeklyUsage[day] || 0 }}</p>
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
        // คำนวณจำนวนการจองต่อสัปดาห์
        this.calculateWeeklyUsage();
        // เรียกใช้ฟังก์ชัน renderChart() ด้วยข้อมูล weeklyUsage ที่คำนวณแล้ว
        this.renderChart();
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

    // ดึงชื่อสนามยิง
    const shootingRangeName = reservation.shootingRange.s_name;

    if (!this.weeklyUsage[dayName][shootingRangeName]) {
      // หากยังไม่มีข้อมูลสนามนี้ในวันนี้ ให้เพิ่มเข้าไปใหม่
      this.weeklyUsage[dayName][shootingRangeName] = 1;
    } else {
      // หากมีแล้ว ให้เพิ่มจำนวนการใช้งาน
      this.weeklyUsage[dayName][shootingRangeName]++;
    }
  });
},

convertToDayName(dayIndex) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayNames[dayIndex];
},

async renderChart() {
  const ctx = document.getElementById('weeklyUsageChart').getContext('2d');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // กำหนดวันทั้ง 7 วัน
  const shootingRanges = await this.getShootingRanges(); // ดึงข้อมูลสนามยิง
  const datasets = [];
  const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)']; // เพิ่มสีตามจำนวนสนาม

  shootingRanges.forEach((shootingRange, index) => {
    const counts = days.map(day => {
      const dailyData = this.weeklyUsage[day];
      if (dailyData && dailyData[shootingRange.s_name]) {
        return dailyData[shootingRange.s_name];
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
