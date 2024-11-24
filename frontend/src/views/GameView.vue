<script setup lang="ts">
import { ref } from 'vue'
import SquareButton from '@/components/SquareButton.vue'
</script>

<template>
  <main>
    <div class="flex items-end justify-end px-12 pt-12">
      <n-space>
        <n-button dashed type="primary"> Quit </n-button>
      </n-space>
    </div>

    <div class="flex flex-col justify-center items-center mt-32">
      <h1 class="text-4xl text-white mb-12">Tic Tac Toe</h1>
      <div class="flex flex-row border-4 border-[#9bc3bb]">
        <SquareButton
          value="1"
          :onClick="() => console.log('Test')"
          class="border-r-4"
        ></SquareButton>
        <SquareButton
          value="2"
          :onClick="() => console.log('Test')"
          class="border-r-4"
        ></SquareButton>
        <SquareButton value="3" :onClick="() => console.log('Test')"></SquareButton>
      </div>
      <div class="flex flex-row border-x-4 border-[#9bc3bb]">
        <SquareButton
          value="4"
          :onClick="() => console.log('Test')"
          class="border-r-4"
        ></SquareButton>
        <SquareButton
          value="5"
          :onClick="() => console.log('Test')"
          class="border-r-4"
        ></SquareButton>
        <SquareButton value="6" :onClick="() => console.log('Test')"></SquareButton>
      </div>
      <div class="flex flex-row border-4 border-[#9bc3bb]">
        <SquareButton
          value="7"
          :onClick="() => console.log('Test')"
          class="border-r-4"
        ></SquareButton>
        <SquareButton
          value="8"
          :onClick="() => console.log('Test')"
          class="border-r-4"
        ></SquareButton>
        <SquareButton value="9" :onClick="() => console.log('Test')"></SquareButton>
      </div>
    </div>
  </main>
</template>
