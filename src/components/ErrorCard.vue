<template>
  <RoundedCard>
    <div class="space-y-4 items-center flex flex-col mb-2">
      <div class="text-red-500">{{ error }}</div>
      <VueButton variant="danger" @click="retry">
        <template #content> Retry Now </template>
      </VueButton>
    </div>
  </RoundedCard>
</template>
<script setup lang="ts">
import RoundedCard from './RoundedCard.vue';
import VueButton from './VueButton.vue';

defineProps<{ error: string; retry: () => void }>();
</script>
