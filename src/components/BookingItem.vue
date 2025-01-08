<template>
  <SectionCard>
    <div class="flex flex-row justify-between items-center">
      <div class="flex space-x-2 items-center">
        <div>{{ title }}</div>
        <div class="border border-gray-200 rounded-full p-3">{{ status }}</div>
        <div>
          <component :is="icon" :class="{ 'animate-spin': pending }" />
        </div>
      </div>
      <VueButton variant="danger" @click="cancelRegisteration(bookingId)"
        ><template #content>Cancel</template></VueButton
      >
    </div>
  </SectionCard>
</template>
<script setup lang="ts">
import SectionCard from '@/components/SectionCard.vue';
import { Check, LoaderCircle } from 'lucide-vue-next';
import { computed } from 'vue';
import VueButton from './VueButton.vue';
const props = defineProps<{
  title: string;
  bookingId: string;
  status: 'pending' | 'canceled' | 'confirmed';
}>();

const emit = defineEmits<{
  (e: 'canceled', bookingId: string): void;
}>();

const cancelRegisteration = async (bookingId: string) => {
  emit('canceled', bookingId);
};

const pending = computed<boolean>(() => {
  return props.status === 'pending';
});
const icon = computed<typeof LoaderCircle | typeof Check>(() => {
  return pending.value ? LoaderCircle : Check;
});
</script>
