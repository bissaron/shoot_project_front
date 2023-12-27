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
              <th class="text-left">08:00 - 09:00</th>
              <th class="text-left">09:00 - 10:00</th>
              <th class="text-left">10:00 - 11:00</th>
              <th class="text-left">11:00 - 12:00</th>
              <th class="text-left">12:00 - 13:00</th>
              <th class="text-left">13:00 - 14:00</th>
              <th class="text-left">14:00 - 15:00</th>
              <th class="text-left">15:00 - 16:00</th>
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
    this.isAdmin = this.auth.user.role === "admin";
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
                "08:00 - 09:00"
              );
              const time_02 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "09:00 - 10:00"
              );
              const time_03 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "10:00 - 11:00"
              );
              const time_04 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "11:00 - 12:00"
              );
              const time_05 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "12:00 - 13:00"
              );
              const time_06 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "13:00 - 14:00"
              );
              const time_07 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "14:00 - 15:00"
              );
              const time_08 = await this.filterReserveItemsByTime(
                this.reserveItems,
                item,
                "15:00 - 16:00"
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
               
                timeD_01: "08:00 - 09:00",
                timeD_02: "09:00 - 10:00",
                timeD_03: "10:00 - 11:00",
                timeD_04: "11:00 - 12:00",
                timeD_05: "12:00 - 13:00",
                timeD_06: "13:00 - 14:00",
                timeD_07: "14:00 - 15:00",
                timeD_08: "15:00 - 16:00",
              
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
}

td {
  padding-top: 10px;
}
.select:hover {
  color: var(--color-main);
}
</style>
