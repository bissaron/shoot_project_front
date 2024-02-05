<template>
  <div>
    <ImageCover />
    <div
      v-if="auth"
      style="
        padding: 100px;
        padding-top: 30px;
        display: flex;
        justify-content: center;
        flex-direction: column;
      "
    >
      <h1>ตารางการจองสนามยิงปืน</h1>
      <div style="padding: 20px; padding-left: 0px">
        <label for="date">เลือกวันที่: </label>
        <input type="date" id="date" name="date" v-model="selectedDate" />
      </div>

      <!-- <p>Selected Date: {{ selectedDate }}</p> -->
      <template>
        <v-table fixed-header height="100px">
          <thead>
            <tr>
              <th class="text-left">ชื่อสนาม/เวลา</th>
              <th class="text-left">17:00 - 17:15</th>
              <th class="text-left">17:15 - 17:30</th>
              <th class="text-left">17:30 - 17:45</th>
              <th class="text-left">17:45 - 18:00</th>
              <th class="text-left">18:00 - 18:15</th>
              <th class="text-left">18:15 - 18:30</th>
              <th class="text-left">18:30 - 18:45</th>
              <th class="text-left">18:45 - 19:00</th> 
              <th class="text-left">19:00 - 19:15</th>
              <th class="text-left">19:15 - 19:30</th>
              <th class="text-left">19:30 - 19:45</th>
              <th class="text-left">19:45 - 20:00</th>
              <th class="text-left">20:00 - 20:15</th>
              <th class="text-left">20:15 - 20:30</th>
            
             
       
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in roomData" :key="index">
              <td>{{ item.range }}</td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_01)
                  "
                  class="select"
                  :disabled="item.time_01 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_01)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_01 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_02)
                  "
                  class="select"
                  :disabled="item.time_02 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_02)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_02 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_03)
                  "
                  class="select"
                  :disabled="item.time_03 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_03)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_03 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_04)
                  "
                  class="select"
                  :disabled="item.time_04 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_04)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_04 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_05)
                  "
                  class="select"
                  :disabled="item.time_05 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_05)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_05 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_06)
                  "
                  class="select"
                  :disabled="item.time_06 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_06)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_06 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_07)
                  "
                  class="select"
                  :disabled="item.time_07 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_07)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_07 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_08)
                  "
                  class="select"
                  :disabled="item.time_08 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_08)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_08 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_09)
                  "
                  class="select"
                  :disabled="item.time_09 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_09)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_09 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_10)
                  "
                  class="select"
                  :disabled="item.time_10 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_10)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_10 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_11)
                  "
                  class="select"
                  :disabled="item.time_11 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_11)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_11 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_12)
                  "
                  class="select"
                  :disabled="item.time_12 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_12)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_12 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_13)
                  "
                  class="select"
                  :disabled="item.time_13 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_13)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_13 }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip
                  @click="
                    openDialogCard(item.range_id, item.range, item.timeD_14)
                  "
                  class="select"
                  :disabled="item.timeD_14 === 'ไม่ว่าง'"
                  label
                  :color="getColor(item.time_14)"
                  style="display: flex; justify-content: center; align-items; center; width: 100px;"
                >
                  <div style="text-align: center">
                    {{ item.time_14 }}
                  </div>
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>
    </div>
    <div
      v-else
      style="
        padding: 50px;
        /* padding-top: 30px; */
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;
      "
    >
    <v-card style="padding: 50px;">
      <h2>** กรุณาเข้าสู่ระบบเพื่อทำการจองสนาม **</h2>
      <v-btn color="primary" style="margin-top: 20px;" @click="$router.push('/login')">เข้าสู่ระบบ</v-btn>

    </v-card>
    </div>
    <v-dialog v-model="dialogOpen" max-width="600px">
      <v-card>
        <v-card-title><h3>ข้อมูลการจอง</h3></v-card-title>
        <v-container style="padding: 25px; padding-top: 0">
          <div style="display: flex; flex-direction: row">
            <span style="font-weight: bold">สนาม:&nbsp;</span>
            <span>{{ dataReserve.range }}</span>
          </div>
          <div style="display: flex; flex-direction: row">
            <span style="font-weight: bold">วันที่จอง:&nbsp;</span>
            <span>{{ dataReserve.r_date_reserve }}</span>
          </div>
          <div style="display: flex; flex-direction: row">
            <span style="font-weight: bold">เวลาที่จอง:&nbsp;</span>
            <span>{{ dataReserve.r_time_reserve }}</span>
          </div>

          <v-select
            v-model="selectGuns"
            :items="gunItems"
            label="เลือกปืน"
            item-value="g_name"
            item-text="g_name"
            multiple
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 4">
                <span>{{ item.g_name }}</span>
              </v-chip>
              <span
                v-if="index === 3 && selectGuns.length > 4"
                class="text-grey text-caption align-self-center"
              >
                (+{{ selectGuns.length - 4 }} others)
              </span>
            </template>
          </v-select>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
              margin-top: 10px;
            "
          >
            <v-btn color="primary" @click="reserveRange()">ยืนยันการจอง</v-btn>
            <v-btn style="margin-left: 10px" @click="closeDialogCard"
              >ยกเลิก</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ImageCover from "@/components/ImageCover.vue";
import Swal from "sweetalert2";

export default {
  name: "HomeView",
  components: {
    ImageCover,
  },
  data() {
    return {
      auth: null,
      items: null,
      c_id: null,
      selectedDate: "",
      rangeItems: [],
      reserveItems: [],
      dialogOpen: false,
      dataReserve: {},
      gunItems: [],
      selectGuns: [],
      roomData: [],

    };
  },
  watch: {
    selectedDate: async function (data) {
      this.selectedDate = data;
      await this.getReserve();
      await this.getAllRange();
    },
  },

  created() {
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.isAdmin = this.auth.user.role === "owner";
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    this.selectedDate = formattedDate;

    this.c_id = JSON.parse(localStorage.getItem("auth"))?.c_id;

    this.getReserve();
    this.getAllRange();
    this.getGuns();
  },

  methods: {
    async filterReserveItemsByTime(reserveItems, shootingRange, time) {
      return new Promise((resolve, reject) => {
        try {
          const filteredReservations = reserveItems.filter((t, i) => {
            return (
              t.shootingRange.s_id === shootingRange.s_id &&
              t.r_time_reserve === time
            );
          });

          resolve(filteredReservations);
        } catch (error) {
          reject(error);
        }
      });
    },
    async getAllRange() {
      try {
        const response = await this.axios.get(
          // Note the use of this.$axios
          process.env.VUE_APP_API_SERVER + `/shootingranges`
        );
        if (response.status === 200) {
          this.rangeItems = response.data;
          this.roomData = await Promise.all(
            this.rangeItems.map(async (item, index) => {
              const time_01 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "17:00 - 17:15"
              );
              const time_02 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "17:15 - 17:30"
              );
              const time_03 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "17:30 - 17:45"
              );
              const time_04 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "17:45 - 18:00"
              );
              const time_05 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "18:00 - 18:15"
              );
              const time_06 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "18:15 - 18:30"
              );
              const time_07 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "18:30 - 18:45"
              );
              const time_08 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "18:45 - 19:00"
              );
              const time_09 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "19:00 - 19:15"
              );
              const time_10 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "19:15 - 19:30"
              );
              const time_11 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "19:30 - 19:45"
              );
              const time_12 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "19:45 - 20:00"
              );
              const time_13 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "20:00 - 20:15"
              );
              const time_14 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "20:15 - 20:30"
              );
              
              // Add similar lines for other time slots

              return {
                range: item.s_name,
                range_id: item.s_id,
                time_01: time_01.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_02: time_02.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_03: time_03.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_04: time_04.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_05: time_05.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_06: time_06.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_07: time_07.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_08: time_08.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_09: time_09.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_10: time_10.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_11: time_11.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_12: time_12.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_13: time_13.length > 0 ? "ไม่ว่าง" : "ว่าง",
                time_14: time_14.length > 0 ? "ไม่ว่าง" : "ว่าง",
                timeD_01: "17:00 - 17:15",
                timeD_02: "17:15 - 17:30",
                timeD_03: "17:30 - 17:45",
                timeD_04: "17:45 - 18:00",
                timeD_05: "18:00 - 18:15",
                timeD_06: "18:15 - 18:30",
                timeD_07: "18:30 - 18:45",
                timeD_08: "18:45 - 19:00",
                timeD_09: "19:00 - 19:15",
                timeD_10: "19:15 - 19:30",
                timeD_11: "19:30 - 19:45",
                timeD_12: "19:45 - 20:00",
                timeD_13: "20:00 - 20:15",
                timeD_14: "20:15 - 20:30",
              };
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    },

    getColor(value) {
      return value === "ว่าง" ? "green" : "red";
    },
    async getReserve() {
      try {
        const response = await this.axios.get(
          process.env.VUE_APP_API_SERVER + "/reserves"
        );
        if (response.status === 200) {
          const filteredReservations = await this.filterReservationsByDate(
            response.data,
            this.selectedDate
          );
          this.reserveItems = filteredReservations;
        }

        // this.reserveItems = data;
        // console.log("reserveItems", this.reserveItems);
      } catch (err) {
        console.error(err);
      }
    },
    filterReservationsByDate(data, selectedDate) {
      return new Promise((resolve, reject) => {
        try {
          const filteredReservations = data.filter((item) => {
            return item.r_date_reserve === selectedDate;
          });

          resolve(filteredReservations);
        } catch (error) {
          reject(error);
        }
      });
    },
    async getGuns() {
      try {
        const response = await this.axios.get(
          process.env.VUE_APP_API_SERVER + "/guns"
        );
        if (response.status === 200) {
          this.gunItems = response.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async reserveRange() {
      try {
        // this.dataReserve.guns = this.selectGuns.map((item) => ({ g_id: item }));
        this.dataReserve.guns = this.selectGuns;

        // console.log("save", this.dataReserve);

        const response = await this.axios.post(
          process.env.VUE_APP_API_SERVER + "/reserve",
          { ...this.dataReserve }
        );
        if (response.status === 201) {
          this.dialogOpen = false;
          Swal.fire({
            title: "จองสนามสำเร็จ!",
            // text: "คุณสมัครสมาชิกสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
            // timer: 1000,
          }).then(() => {
            window.location.href = "/reservedata";
          });
        }
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          // text: "คุณสมัครสมาชิกสำเร็จ",
          icon: "error",
          confirmButtonText: "ตกลง",
          timer: 1500,
        });
        console.error(err);
      }
    },
    async openDialogCard(s_id, s_name, r_time_reserve) {
      if (this.isAdmin) return;
      if (await this.getDetail()) return;
      this.dataReserve = {
        range: s_name,
        r_date_reserve: this.selectedDate,
        r_time_reserve: r_time_reserve,
        customer: {
          c_id: this.c_id,
        },
        shootingRange: {
          s_id: s_id,
        },
        guns: [],
      };
      this.dialogOpen = true;
      // console.log(this.dataReserve);
    },
    closeDialogCard() {
      // Reset the editedUser and close the dialog
      this.dataReserve = {};
      this.dataReserve.guns = [];
      this.dialogOpen = false;
    },
    async getDetail() {
      try {
        const response = await this.axios.get(
          process.env.VUE_APP_API_SERVER + `/reserves`
        );
        if (response.status === 200) {
          this.items = response.data.filter(
            (item) => item.customer.c_id === this.c_id
          );
          console.log("this.items", this.items);
          if (this.items.length > 0) {
            Swal.fire({
              title: "คุณมีสนามที่จองอยู่แล้ว!",
              text: "คุณสามารถจองได้ 1 สนามต่อครั้ง",
              icon: "warning",
              confirmButtonText: "ดูข้อมูล",
              showCancelButton: true,
              cancelButtonText: "ปิด",
              // timer: 1000,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/reservedata";
              }
            });
            return true;
          } else if (this.items.length === 0) {
            return false;
          }
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  },
};
</script>

<style scoped>
.text-left {
  width: 300px;
  font-size: 12px;
  text-align: center;
  padding:  10px;
}

td {
  padding-top: 10px;
}
.select:hover {
  color: var(--color-main);
}
</style>