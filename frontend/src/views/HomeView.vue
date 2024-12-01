<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSocketStore } from '@/stores/socket'

const store = useSocketStore()
const { connectSocket, disconnectSocket, setGameId } = store
const router = useRouter()
const gameId = ref('')
const showAlert = ref(false)
const alertMessage = ref('')
const loading = ref(false)
const playerName = ref('')

onMounted(() => {
  loading.value = false
  showAlert.value = false
})

const createGame = () => {
  if (gameId.value === '') {
    alertMessage.value =
      'Game ID is required to create a custom game. Please enter a game ID and try again.'
    showAlert.value = true
    return
  }

  setGameId(gameId.value)
  connectSocket()

  loading.value = true

  router.push('/game')
}
</script>

<template>
  <main class="flex flex-col h-screen w-full items-center justify-center px-4">
    <!-- Error Alert -->
    <n-alert
      v-if="showAlert && gameId.length < 1"
      title="Error"
      type="error"
      closable
      class="max-w-2xl mb-16"
    >
      {{ alertMessage }}
    </n-alert>
    <div
      class="px-4 py-4 sm:px-8 md:px-12 sm:py-4 md:py-12 max-w-md mx-auto bg-zinc-700 shadow-md rounded-3xl"
    >
      <label
        class="text-white font-bold mb-3 sm:mb-5 text-base sm:text-lg tracking-wider"
        htmlFor="player-name"
      >
        Player Name
      </label>
      <input
        class="w-full border rounded-xl h-10 sm:h-14 py-2 px-4 mb-4 sm:mb-6 text-black placeholder-gray-400 bg-gray-200 ring-2 focus:ring-lime-500 hover:ring-lime-500 focus:outline-none focus:shadow-outline tracking-widest text-sm sm:text-base"
        id="player-name"
        type="text"
        v-model="playerName"
      />

      <label
        class="text-white font-bold mb-3 sm:mb-5 text-base sm:text-lg tracking-wider"
        htmlFor="game-room-id"
      >
        Game Room ID
      </label>
      <input
        class="w-full border rounded-md h-10 sm:h-14 py-2 px-3 mb-4 sm:mb-6 text-black placeholder-gray-400 bg-gray-200 ring-2 focus:ring-lime-500 hover:ring-lime-500 focus:outline-none focus:shadow-outline tracking-widest text-sm sm:text-base"
        id="game-room-id"
        type="text"
        placeholder="5wec1"
        v-model="gameId"
      />

      <div class="space-y-16">
        <n-button
          :loading="loading"
          icon-placement="left"
          @click="createGame"
          class="w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline tracking-widest text-base sm:text-2xl font-mono bg-yellow-200 cursor-pointer hover:bg-yellow-300 transition-colors duration-200"
        >
          {{ loading ? 'Waiting for second player to join' : 'Create Custom Game' }}
        </n-button>

        <button
          class="w-full py-2 px-3 rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline tracking-widest text-base sm:text-2xl font-mono bg-red-200 cursor-pointer hover:bg-red-300 transition-colors duration-200"
          type="button"
          @click="disconnectSocket()"
        >
          Disconnect Socket
        </button>
      </div>
    </div>
  </main>
</template>
