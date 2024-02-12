<template>
  <v-dialog v-model="modalOpen" max-width="500" >
    <v-card>
      <v-card-title>Reservation Details</v-card-title>
      <v-card-text>
        {{ selectedRoomData }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['modalOpen', 'selectedRoomData'],
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>
