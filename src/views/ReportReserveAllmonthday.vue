<template>
    <v-container style="padding-top: 50px; padding-bottom: 60px">
      <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
        <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
      </v-btn>
      <h2>รายงาน</h2>
      <canvas id="monthlyUsageChart" style="max-height: 400px;"></canvas>
      
      <canvas id="weeklyUsageChart" style="max-height: 400px; margin-top: 20px;"></canvas>
      
    </v-container>
  </template>
  
  <script>
  import moment from 'moment'; // นำเข้าไลบรารี moment.js
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        reservations: [], // ข้อมูลการจอง
        monthlyUsage: {}, // จำนวนการใช้งานต่อเดือน
        weeklyUsage: {} // จำนวนการใช้งานต่อสัปดาห์
      };
    },
    created() {
      // ดึงข้อมูลการจอง
      this.getReservations().then(() => {
        // เมื่อข้อมูลการจองถูกดึงมาแล้ว ก็สร้างกราฟ
        this.renderCharts();
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
            // คำนวณจำนวนการจองต่อเดือนและต่อสัปดาห์
            this.calculateMonthlyUsage();
            this.calculateWeeklyUsage();
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
  
      calculateWeeklyUsage() {
        this.weeklyUsage = {}; // เริ่มต้นตารางเป็นช่องว่างทั้งหมด
    
        this.reservations.forEach(reservation => {
          const date = new Date(reservation.r_date_reserve);
          const dayIndex = moment(date).format('dddd'); // ดึงชื่อวันในสัปดาห์
          
          if (this.weeklyUsage[dayIndex]) {
            // หากช่องข้อมูลวันนั้นมีอยู่แล้ว ให้เพิ่มจำนวนการใช้งาน
            this.weeklyUsage[dayIndex]++;
          } else {
            // หากไม่มีให้สร้างช่องข้อมูลวันใหม่และกำหนดจำนวนการใช้งานเป็น 1
            this.weeklyUsage[dayIndex] = 1;
          }
        });
    
        // เรียงลำดับตามลำดับของวันในสัปดาห์
        const sortedWeeklyUsage = {};
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
          sortedWeeklyUsage[day] = this.weeklyUsage[day] || 0;
        });
        this.weeklyUsage = sortedWeeklyUsage;
      },
  
      async renderCharts() {
        const monthlyCtx = document.getElementById('monthlyUsageChart').getContext('2d');
        const weeklyCtx = document.getElementById('weeklyUsageChart').getContext('2d');
        const months = Object.keys(this.monthlyUsage);
        const monthlyCounts = Object.values(this.monthlyUsage);
        const days = Object.keys(this.weeklyUsage);
        const weeklyCounts = Object.values(this.weeklyUsage);
    
        // เรียกใช้งาน Chart.js เพื่อสร้างกราฟรายงานการใช้งานตามเดือน
        new Chart(monthlyCtx, {
          type: 'bar',
          data: {
            labels: months,
            datasets: [{
              label: 'จำนวนการใช้งาน',
              data: monthlyCounts,
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
    
        // เรียกใช้งาน Chart.js เพื่อสร้างกราฟรายงานการใช้งานตามสัปดาห์
        new Chart(weeklyCtx, {
          type: 'bar',
          data: {
            labels: days,
            datasets: [{
              label: 'จำนวนการใช้งาน',
              data: weeklyCounts,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
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
  