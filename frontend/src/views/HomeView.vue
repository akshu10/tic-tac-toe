<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSocketStore } from '@/stores/socket'

const { connectSocket, disconnectSocket, setGameId } = useSocketStore()
const router = useRouter()
const gameId = ref('')
const showAlert = ref(false)
const alertMessage = ref('')
const loading = ref(false)

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
  console.log('Starting game...')
  setGameId(gameId.value)
  connectSocket()

  loading.value = true

  router.push('/game')
}
</script>

<template>
  <main>
    <div class="flex flex-col h-screen justify-center items-center">
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
      <div class="mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <!--Game room Input-->
        <label
          class="block text-black font-bold mb-5 text-lg tracking-wider"
          htmlFor="game-room-id"
        >
          Game Room ID
        </label>
        <input
          class="border rounded-md w-full h-14 py-2 px-3 mb-6 text-black placeholder-gray-400 bg-gray-200 ring-2 focus:ring-lime-500 hover:ring-lime-500 focus:outline-none focus:shadow-outline tracking-widest"
          id="game-room-id"
          type="text"
          placeholder="5wec1"
          v-model="gameId"
        />

        <!-- Create Game Button-->
        <div class="mb-4">
          <n-button
            :loading="loading"
            icon-placement="left"
            @click="createGame"
            class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline tracking-widest text-2xl font-mono bg-yellow-200 cursor-pointer"
          >
            {{ loading ? 'Waiting for second player to join' : 'Create Custom Game' }}
          </n-button>
          <button
            class="mt-8 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline tracking-widest text-2xl font-mono bg-red-200 cursor-pointer"
            type="button"
            @click="disconnectSocket()"
          >
            Disconnect Socket
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
