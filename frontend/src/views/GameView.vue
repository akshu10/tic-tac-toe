<script setup lang="ts">
import { ref } from 'vue'
import SquareButton from '@/components/SquareButton.vue'

const xIsNext = ref(true)
const squares = ref<(string | null)[][]>(new Array(3))

for (let i = 0; i < squares.value.length; i++) {
  squares.value[i] = Array(3).fill(null)
}

const handleOnClick = (index: number) => {
  const flattenedArray = squares.value.flat()

  if (xIsNext.value) {
    // should listen to click and render wx in that square
    flattenedArray[index] = 'x'
    xIsNext.value = false
  } else {
    // should listen to click and render o in that square
    flattenedArray[index] = 'o'
    xIsNext.value = true
  }

  squares.value[0] = flattenedArray.splice(0, 3)
  squares.value[1] = flattenedArray.splice(0, 3)
  squares.value[2] = flattenedArray.splice(0, 3)
}
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
          :value="squares[0][0]"
          :onClick="() => handleOnClick(0)"
          class="border-r-4"
        ></SquareButton>
        <SquareButton
          :value="squares[0][1]"
          :onClick="() => handleOnClick(1)"
          class="border-r-4"
        ></SquareButton>
        <SquareButton :value="squares[0][2]" :onClick="() => handleOnClick(2)"></SquareButton>
      </div>
      <div class="flex flex-row border-x-4 border-[#9bc3bb]">
        <SquareButton
          :value="squares[1][0]"
          :onClick="() => handleOnClick(3)"
          class="border-r-4"
        ></SquareButton>
        <SquareButton
          :value="squares[1][1]"
          :onClick="() => handleOnClick(4)"
          class="border-r-4"
        ></SquareButton>
        <SquareButton :value="squares[1][2]" :onClick="() => handleOnClick(5)"></SquareButton>
      </div>
      <div class="flex flex-row border-4 border-[#9bc3bb]">
        <SquareButton
          :value="squares[2][0]"
          :onClick="() => handleOnClick(6)"
          class="border-r-4"
        ></SquareButton>
        <SquareButton
          :value="squares[2][1]"
          :onClick="() => handleOnClick(7)"
          class="border-r-4"
        ></SquareButton>
        <SquareButton :value="squares[2][2]" :onClick="() => handleOnClick(8)"></SquareButton>
      </div>
    </div>
  </main>
</template>
