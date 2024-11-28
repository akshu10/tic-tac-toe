<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  value: string | null
  onClick: (payload: MouseEvent) => void
  disabled: boolean
}>()
</script>

<template>
  <button @click="onClick" class="bg-white w-20 h-16 text-3xl" :disabled="disabled">
    {{ value }}
  </button>
</template>
