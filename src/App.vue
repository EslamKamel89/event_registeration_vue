<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <EventCard
        v-for="i in 8"
        :key="i"
        title="Vue confiernce 2024"
        when="2024-8-8"
        description="Confernce about vue and javascript"
        @register="(id: number) => console.log(id)"
      />
    </section>
    <h2 class="text-2xl font-medium">Your Booking</h2>
    <section class="grid grid-cols-1 gap-8">
      <BookingItem v-for="index in 3" :key="index" title="Rails Confernce 2024"></BookingItem>
    </section>
  </main>
</template>
<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import BookingItem from './components/BookingItem.vue';
</script>
