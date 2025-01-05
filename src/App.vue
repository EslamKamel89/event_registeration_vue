<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <template v-if="!eventLoading">
        <EventCard
          v-for="ev in events"
          :key="ev.id"
          :title="ev.title"
          :when="ev.date"
          :description="ev.description"
          @register="(id: string) => handleRegisteration(ev)"
        />
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 8" :key="i" />
      </template>
    </section>

    <h2 class="text-2xl font-medium">Your Booking</h2>
    <section class="grid grid-cols-1 gap-8">
      <template v-if="!bookingsLoading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
        ></BookingItem>
      </template>
      <template v-else>
        <BookingItemLoading v-for="i in 4" :key="i" />
      </template>
    </section>
  </main>
</template>
<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import { onMounted, ref } from 'vue';
import BookingItem from './components/BookingItem.vue';
import BookingItemLoading from './components/BookingItemLoading.vue';
import LoadingEventCard from './components/LoadingEventCard.vue';
type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
};
type Booking = {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  status: 'pending' | 'canceled' | 'confirmed';
};
const events = ref<Event[]>([]);
const eventLoading = ref<boolean>(false);
const bookings = ref<Booking[]>([]);
const bookingsLoading = ref<boolean>(false);
const fetchEvents = async () => {
  eventLoading.value = true;
  try {
    const response = await fetch('http://localhost:3000/events');
    events.value = await response.json();
    console.log(events.value);
  } catch (error) {
    console.log(error);
  }
  eventLoading.value = false;
};
const fetchBookings = async () => {
  try {
    bookingsLoading.value = true;
    const response = await fetch('http://localhost:3000/bookings');
    bookings.value = await response.json();
  } catch (error) {
    console.log(error);
  }
  bookingsLoading.value = false;
};
onMounted(() => {
  fetchEvents();
  fetchBookings();
});

const handleRegisteration = async (event: Event) => {
  const newBooking: Booking = {
    id: Date.now().toString(),
    userId: '1',
    eventId: event.id,
    eventTitle: event.title,
    status: 'confirmed',
  };
  bookings.value.push(newBooking);
  const response = await fetch('http://localhost:3000/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBooking),
  });
  console.log('register event ', response);
};
</script>
