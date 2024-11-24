<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  value: string
  onClick: (payload: MouseEvent) => void
}>()
</script>

<template>
  <button @click="onClick" class="border bg-white border-black w-20 h-16 text-lg">
    {{ value }}
  </button>
</template>
