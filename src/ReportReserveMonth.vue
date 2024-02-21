<template>
    <v-container style="padding-top: 50px; padding-bottom: 60px">
      <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
        <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
      </v-btn>
      <h2>รายงาน</h2>
      <canvas id="monthlyUsageChart"></canvas>
  
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="(count, month) in monthlyUsage" :key="month">
          <v-card>
            <v-card-text>
              <h3>{{ month }}</h3>
              <p>จำนวนการใช้งาน: {{ count }}</p>
            </v-card-text>
          </v-card>
        </v-col>
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
          process.env.VUE_APP_API_SERVER + `/reserves`
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
    
    calculateMonthlyUsage() {
    this.monthlyUsage = {}; // เริ่มต้นตารางเป็นช่องว่างทั้งหมด
  
    this.reservations.forEach(reservation => {
      const date = new Date(reservation.r_date_reserve);
      const monthIndex = date.getMonth(); // ดึงเดือนเป็นหมายเลขลำดับ
      const monthName = moment.monthsShort(monthIndex); // แปลงเดือนเป็นชื่อย่อ
  
      if (this.monthlyUsage[monthName]) {
        // หากช่องข้อมูลเดือนนั้นมีอยู่แล้ว ให้เพิ่มจำนวนการใช้งาน
        this.monthlyUsage[monthName]++;
      } else {
        // หากไม่มีให้สร้างช่องข้อมูลเดือนใหม่และกำหนดจำนวนการใช้งานเป็น 1
        this.monthlyUsage[monthName] = 1;
      }
    });
  
    // ทำการเรียงลำดับตามเดือน
    const sortedMonthlyUsage = {};
    moment.monthsShort().forEach(month => {
      sortedMonthlyUsage[month] = this.monthlyUsage[month] || 0;
    });
    this.monthlyUsage = sortedMonthlyUsage;
  },
  
  
    
  async renderChart() {
    const ctx = document.getElementById('monthlyUsageChart').getContext('2d');
    const months = Object.keys(this.monthlyUsage);
    const counts = Object.values(this.monthlyUsage);
  
    if (this.chart) {
      this.chart.destroy(); // ทำลายกราฟที่มีอยู่
    }
  
    this.chart = new Chart(ctx, { // เก็บอ็อบเจกต์ Chart.js เพื่อทำลายในครั้งถัดไป
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'จำนวนการใช้งาน',
          data: counts,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
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
  