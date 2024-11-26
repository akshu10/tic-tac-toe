<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  value: string | null
  onClick: (payload: MouseEvent) => void
}>()
</script>

<template>
  <button @click="onClick" class="bg-white w-20 h-16 text-3xl">
    {{ value }}
  </button>
</template>
