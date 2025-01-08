<template>
  <template v-if="error != null">
    <ErrorCard error="bookingsError" :retry="fetchEvents" />
  </template>
  <template v-else>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <template v-if="!eventLoading">
        <template v-if="events.length > 0">
          <EventCard
            v-for="ev in events"
            :key="ev.id"
            :title="ev.title"
            :when="ev.date"
            :description="ev.description"
            @click="handleRegisteration(ev)"
          />
        </template>
        <template v-else>
          <div class="col-span-2 text-gray-700 text-center">No Events Right Now</div>
        </template>
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 8" :key="i" />
      </template>
    </section>
  </template>
</template>
<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import useBookings, { type Event } from '@/composables/useBookings';
import { onMounted, ref } from 'vue';
import ErrorCard from './ErrorCard.vue';
import LoadingEventCard from './LoadingEventCard.vue';
const events = ref<Event[]>([]);
const eventLoading = ref<boolean>(false);
const error = ref<string | null>(null);
const { handleRegisteration } = useBookings();

const fetchEvents = async () => {
  eventLoading.value = true;
  error.value = null;
  try {
    const response = await fetch('http://localhost:3000/events');
    events.value = await response.json();
    console.log(events.value);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      error.value = e.message;
    }
    error.value = `Could not load events at the moment, Please try again`;
  }
  eventLoading.value = false;
};
onMounted(() => {
  fetchEvents();
});
</script>
