<template>
  <section class="grid grid-cols-1 gap-8">
    <template v-if="!bookingsLoading">
      <BookingItem
        v-for="booking in bookings"
        :key="booking.id"
        :title="booking.eventTitle"
        :status="booking.status"
        :booking-id="booking.id"
        @canceled="cancelBooking"
      ></BookingItem>
    </template>
    <template v-else>
      <BookingItemLoading v-for="i in 4" :key="i" />
    </template>
  </section>
</template>
<script lang="ts" setup>
import useBookings, { fetchBookings } from '@/composables/useBookings';
import { onMounted } from 'vue';
import BookingItem from './BookingItem.vue';
import BookingItemLoading from './BookingItemLoading.vue';

const { bookings, bookingsLoading, cancelBooking } = useBookings();
onMounted(() => {
  fetchBookings();
});
</script>
