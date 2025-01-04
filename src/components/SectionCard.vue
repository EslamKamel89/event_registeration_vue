<template>
  <RoundedCard>
    <h3 v-if="$slots.header" class="p-4 font-medium text-xl border-b border-gray-200">
      <slot name="header"></slot>
    </h3>
    <p class="p-4 border-gray-200" :class="{ 'border-b': $slots.description }">
      <slot></slot>
    </p>
    <p v-if="$slots.description" class="p-4">
      <slot name="description"></slot>
    </p>
    <section v-if="$slots.footer" class="flex justify-end p-4">
      <slot name="footer"></slot>
    </section>
  </RoundedCard>
</template>
<script setup lang="ts">
import RoundedCard from '@/components/RoundedCard.vue';
</script>
