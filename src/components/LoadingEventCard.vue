<script setup lang="ts">
import RoundedCard from './RoundedCard.vue';
</script>

<template>
  <RoundedCard>
    <div class="space-y-2 animate-pulse">
      <div class="p-4 border-b border-gray-200 h-7 bg-gray-300"></div>
      <div class="p-4 border-b border-gray-200 h-5 bg-gray-300"></div>
      <div class="h-5 bg-gray-300"></div>
      <div class="flex justify-end p-4">
        <div class="h-9 w-24 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </RoundedCard>
</template>
