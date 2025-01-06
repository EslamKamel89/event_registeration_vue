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
          :status="booking.status"
          :booking-id="booking.id"
          @canceled="cancelBooking"
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
import pr from './utils/pr';
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

const handleRegisteration = async (event: Event) => {
  const bookingIndex = bookings.value.findIndex((booking: Booking) => booking.eventId == event.id);
  if (bookingIndex >= 0) {
    alert('You already registered for this event ');
    return;
  }
  const newBooking: Booking = {
    id: Date.now().toString(),
    userId: '1',
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending',
  };
  bookings.value.push(newBooking);
  try {
    const response = await fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newBooking, status: 'confirmed' }),
    });
    if (response.ok) {
      const savedBookingIndex: number = bookings.value.findIndex(
        (booking: Booking) => booking.eventId == event.id,
      );
      if (savedBookingIndex >= 0) bookings.value[savedBookingIndex] = await response.json();
    } else {
      throw new Error('Failed to confirm booking');
    }
  } catch (error) {
    console.error(`Failed to save the booking to the database: ${error}`);
    bookings.value = bookings.value.filter((booking: Booking) => booking.eventId != event.id);
  }
};

const findBookingById = (id: string): number => {
  const index = bookings.value.findIndex((booking: Booking) => booking.id == id);
  return index;
};

const cancelBooking = async (bookingId: string) => {
  pr(bookingId, 'This is the booking id that will be canceled');
  const index = findBookingById(bookingId);
  if (index < 0) {
    console.error('the id of the booking not found in the booking list');
    return;
  }
  const origianlBooking = bookings.value[index];
  bookings.value.splice(index, 1);
  try {
    const response = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Booking could not be canceled');
    }
  } catch (e) {
    console.error(`Failed to cancel booking:${e}`);
    bookings.value.splice(index, 0, origianlBooking);
  }
};

onMounted(() => {
  fetchEvents();
  fetchBookings();
});
</script>
