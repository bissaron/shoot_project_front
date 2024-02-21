<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายงาน</h2>
<<<<<<< HEAD
    <canvas id="usageChart" style="max-height: 400px;"></canvas> <!-- ปรับขนาด canvas -->
    <v-row>
  
</v-row>
  </v-container>
</template>

=======
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
>>>>>>> 46184d5b162f3ed5471fa5bd8e6f910e93c39b25
<script>
import moment from 'moment'; // นำเข้าไลบรารี moment.js
import Chart from 'chart.js/auto';

<<<<<<< HEAD
=======

>>>>>>> 46184d5b162f3ed5471fa5bd8e6f910e93c39b25
export default {
  data() {
    return {
      auth: JSON.parse(localStorage.getItem("auth")) || {}, // กำหนดค่าเริ่มต้นเป็นอ็อบเจกต์ว่าง {} หากไม่มีข้อมูล auth ใน localStorage
<<<<<<< HEAD

      reservations: [], // ข้อมูลการจอง
      usageData: {} // จำนวนการใช้งานตามวันในสัปดาห์
=======
      reservations: [], // ข้อมูลการจอง
      monthlyUsage: {} // จำนวนการใช้งานต่อเดือน
>>>>>>> 46184d5b162f3ed5471fa5bd8e6f910e93c39b25
    };
  },
  created() {
    // ดึงข้อมูลการจองเฉพาะ c_id ของผู้ใช้ปัจจุบัน
    this.getReservations(this.auth.c_id).then(() => {
      // เมื่อข้อมูลการจองถูกดึงมาแล้ว ก็สร้างกราฟ
      this.renderChart();
    });
<<<<<<< HEAD
},

methods: {
    async getReservations(c_id) {
        try {
            // ดึงข้อมูลการจองเฉพาะ c_id ของผู้ใช้ปัจจุบันจาก API หรือฐานข้อมูล
            const response = await this.axios.get(
                process.env.VUE_APP_API_SERVER + `/reserves?c_id=${c_id}`
            );
            if (response.status === 200) {
                // กำหนดข้อมูลการจองให้กับตัวแปร reservations
                this.reservations = response.data;
                // คำนวณจำนวนการจองต่อเดือน
                this.calculateUsageData();
                this.renderChart(); // เรียกใช้ฟังก์ชัน renderChart() ที่นี่
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    },

    calculateUsageData() {
        this.usageData = {}; // เริ่มต้นตารางเป็นช่องว่างทั้งหมด

        this.reservations.forEach(reservation => {
            if (reservation.customer.c_id === this.auth.c_id) { // ตรวจสอบ c_id ของผู้ใช้ปัจจุบัน

                const date = new Date(reservation.r_date_reserve);
                const monthIndex = date.getMonth(); // ดึงเดือนเป็นหมายเลขลำดับ
                const monthName = moment.monthsShort(monthIndex); // แปลงเดือนเป็นชื่อย่อ

                if (!this.usageData[monthName]) {
                    this.usageData[monthName] = {};
                }

                const dayIndex = moment(date).format('dddd'); // ดึงชื่อวันในสัปดาห์

                if (this.usageData[monthName][dayIndex]) {
                    // หากช่องข้อมูลวันนั้นมีอยู่แล้ว ให้เพิ่มจำนวนการใช้งาน
                    this.usageData[monthName][dayIndex]++;
                } else {
                    // หากไม่มีให้สร้างช่องข้อมูลวันใหม่และกำหนดจำนวนการใช้งานเป็น 1
                    this.usageData[monthName][dayIndex] = 1;
                }
            }
        });
    },

    async renderChart() {
    const ctx = document.getElementById('usageChart').getContext('2d');
    const months = moment.monthsShort(); // เรียกชื่อเดือนทั้ง 12 ออกมา

    if (this.chart) {
        this.chart.destroy(); // ทำลายกราฟที่มีอยู่
    }

    const colors = [
    'rgba(255, 0, 0, 0.2)',    // วันอาทิตย์
  'rgba(255, 255, 0, 0.2)',  // วันจันทร์
  'rgba(255, 192, 203, 0.2)',// วันอังคาร
  'rgba(0, 128, 0, 0.2)',    // วันพุธ
  'rgba(255, 165, 0, 0.2)',  // วันพฤหัสบดี
  'rgba(0, 0, 255, 0.2)',    // วันศุกร์
  'rgba(128, 0, 128, 0.2)'
    ];

   

    this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: Array.from({ length: 7 }, (_, i) => ({
                label: moment().day(i).format('dddd').substring(0, 3), // ใช้เพียง 3 ตัวอักษรเป็น label
                data: months.map(month => (this.usageData[month] ? this.usageData[month][moment().day(i).format('dddd')] || 0 : 0)),
                backgroundColor: colors[i], // ใช้สีตามลำดับของวัน
                borderColor: colors[i].replace('0.2', '1'), // เปลี่ยนค่า alpha เพื่อทำให้เข้มขึ้น
                borderWidth: 1,
            })),
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
=======
  },

  methods: {
    async getReservations(c_id) {
      try {
        // ดึงข้อมูลการจองเฉพาะ c_id ของผู้ใช้ปัจจุบันจาก API หรือฐานข้อมูล
        const response = await this.axios.get(
          process.env.VUE_APP_API_SERVER + `/reserves?c_id=${c_id}`
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
        if (reservation.customer.c_id === this.auth.c_id) { // ตรวจสอบ c_id ของผู้ใช้ปัจจุบัน
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
>>>>>>> 46184d5b162f3ed5471fa5bd8e6f910e93c39b25
            }
          }
        }
      });
    }
  }
};
</script>
