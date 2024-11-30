<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import SquareButton from '@/components/SquareButton.vue'
import { useSocketStore } from '@/stores/socket'

const store = useSocketStore()
const { disconnectSocket, move, getDisableBoard, toggleSelfTurn } = store
const { selfTurn } = storeToRefs(store)

const squares = ref<(string | null)[][]>(new Array(3))

for (let i = 0; i < squares.value.length; i++) {
  squares.value[i] = Array(3).fill(null)
}

const handleOnClick = (index: number) => {
  const flattenedArray = squares.value.flat()

  if (selfTurn.value) {
    // should listen to click and render wx in that square
    flattenedArray[index] = 'x'
    toggleSelfTurn()
  } else {
    // should listen to click and render o in that square
    flattenedArray[index] = 'o'
    toggleSelfTurn()
  }

  squares.value[0] = flattenedArray.splice(0, 3)
  squares.value[1] = flattenedArray.splice(0, 3)
  squares.value[2] = flattenedArray.splice(0, 3)

  move(squares.value)
}
</script>

<template>
  <main>
    <div class="flex items-end justify-end px-12 pt-12">
      <n-space>
        <n-button dashed type="info" size="large" @click="disconnectSocket()"> Quit </n-button>
      </n-space>
    </div>

    <div class="flex flex-col justify-center items-center mt-32">
      <h1 class="text-4xl text-white mb-12">Tic Tac Toe</h1>

      <div class="flex gap-36 items-center">
        <div class="block text-center text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="w-12 h-12"
            :class="{ 'fill-green-500': selfTurn, 'fill-red-700': !selfTurn }"
          >
            <path
              d="M320 128a96 96 0 1 0 -192 0 96 96 0 1 0 192 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM32 480l384 0c-1.2-79.7-66.2-144-146.3-144l-91.4 0c-80 0-145 64.3-146.3 144zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"
            />
          </svg>
          <p class="mt-2" :class="{ 'text-green-500': selfTurn, 'text-red-700': !selfTurn }">X</p>
        </div>

        <div class="flex flex-col">
          <div class="flex flex-row border-4 border-[#9bc3bb]">
            <SquareButton
              :value="squares[0][0]"
              :onClick="() => handleOnClick(0)"
              class="border-r-4"
              :disabled="getDisableBoard()"
            ></SquareButton>
            <SquareButton
              :value="squares[0][1]"
              :onClick="() => handleOnClick(1)"
              class="border-r-4"
              :disabled="getDisableBoard()"
            ></SquareButton>
            <SquareButton
              :value="squares[0][2]"
              :onClick="() => handleOnClick(2)"
              :disabled="getDisableBoard()"
            ></SquareButton>
          </div>
          <div class="flex flex-row border-x-4 border-[#9bc3bb]">
            <SquareButton
              :value="squares[1][0]"
              :onClick="() => handleOnClick(3)"
              class="border-r-4"
              :disabled="getDisableBoard()"
            ></SquareButton>
            <SquareButton
              :value="squares[1][1]"
              :onClick="() => handleOnClick(4)"
              class="border-r-4"
              :disabled="getDisableBoard()"
            ></SquareButton>
            <SquareButton
              :value="squares[1][2]"
              :onClick="() => handleOnClick(5)"
              :disabled="getDisableBoard()"
            ></SquareButton>
          </div>
          <div class="flex flex-row border-4 border-[#9bc3bb]">
            <SquareButton
              :value="squares[2][0]"
              :onClick="() => handleOnClick(6)"
              class="border-r-4"
              :disabled="getDisableBoard()"
            ></SquareButton>
            <SquareButton
              :value="squares[2][1]"
              :onClick="() => handleOnClick(7)"
              class="border-r-4"
              :disabled="getDisableBoard()"
            ></SquareButton>
            <SquareButton
              :value="squares[2][2]"
              :onClick="() => handleOnClick(8)"
              :disabled="getDisableBoard()"
            ></SquareButton>
          </div>
        </div>

        <div class="block text-center text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="w-12 h-12"
            :class="{ 'fill-green-500': selfTurn, 'fill-red-700': !selfTurn }"
          >
            <path
              d="M320 128a96 96 0 1 0 -192 0 96 96 0 1 0 192 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM32 480l384 0c-1.2-79.7-66.2-144-146.3-144l-91.4 0c-80 0-145 64.3-146.3 144zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"
            />
          </svg>
          <p class="mt-2" :class="{ 'text-green-500': selfTurn, 'text-red-700': !selfTurn }">O</p>
        </div>
      </div>
    </div>
  </main>
</template>
