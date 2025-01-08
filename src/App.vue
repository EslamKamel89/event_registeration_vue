<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <EventList />
    <h2 class="text-2xl font-medium">Your Booking</h2>
    <BookingList />
  </main>
</template>
<script setup lang="ts">
import BookingList from './components/BookingList.vue';
import EventList from './components/EventList.vue';
</script>
