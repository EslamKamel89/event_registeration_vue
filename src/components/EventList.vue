<template>
  <template v-if="error != null">
    <RoundedCard>
      <div class="space-y-4 items-center flex flex-col mb-2">
        <div class="text-red-500">{{ error }}</div>
        <VueButton @click="fetchEvents" variant="danger">
          <template #content> Retry Now </template>
        </VueButton>
      </div>
    </RoundedCard>
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
            @register="(id: string) => emit('register', ev)"
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
import type { Event } from '@/App.vue';
import EventCard from '@/components/EventCard.vue';
import { onMounted, ref } from 'vue';
import LoadingEventCard from './LoadingEventCard.vue';
import RoundedCard from './RoundedCard.vue';
import VueButton from './VueButton.vue';
const events = ref<Event[]>([]);
const eventLoading = ref<boolean>(false);
const error = ref<string | null>(null);
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
const emit = defineEmits<{
  register: [event: Event];
}>();
</script>
