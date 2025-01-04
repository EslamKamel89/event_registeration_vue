<template>
  <SectionCard>
    <div class="flex flex-row justify-between">
      <div>{{ title }}</div>
      <VueButton variant="danger"><template #content>Cancel</template></VueButton>
    </div>
  </SectionCard>
</template>
<script setup lang="ts">
import SectionCard from '@/components/SectionCard.vue';
import VueButton from './VueButton.vue';
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
