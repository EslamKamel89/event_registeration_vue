<template>
  <button class="text-sm font-medium border rounded px-3 py-1" :class="variants[variant]">
    <slot name="content">Default</slot>
  </button>
</template>
<script setup lang="ts">
type Variant = 'default' | 'danger';
type Props = {
  variant: Variant;
};
defineProps<Props>();
const variants = {
  danger: ' border-red-200 bg-red-50  hover:bg-red-100',
  default: ' border-gray-200 bg-gray-50  hover:bg-gray-100',
};
</script>
