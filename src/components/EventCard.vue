<template>
  <SectionCard>
    <template #header>{{ title }}</template>
    <template #default>{{ when }}</template>
    <template #description>{{ description }}</template>
    <template #footer>
      <VueButton variant="default" @click="emit('register', '1')">
        <template #content>
          <div>Register Now!!</div>
        </template>
      </VueButton>
    </template>
  </SectionCard>
</template>
<script lang="ts" setup>
import SectionCard from '@/components/SectionCard.vue';
import VueButton from '@/components/VueButton.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  when: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  register: [id: string];
}>();
</script>
