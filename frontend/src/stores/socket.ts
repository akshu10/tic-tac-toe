import { ref } from 'vue'
import { defineStore } from 'pinia'

import { io, Socket } from 'socket.io-client'

export const useSocketStore = defineStore('socket', () => {
  const connectedSocket = ref<Socket>()
  const connectedSocketId = ref<string | null>()

  /**
   *
   * @param _gameId - game id to join or create a custom game
   *
   * Connects to the socket server
   */
  function connectSocket(_gameId?: string) {
    // if game id is provided, user intends to join/create a custom game
    const socket = io('http://localhost:8080', {})

    socket.on('connection', (data: Record<string, string>) => {
      console.log('Connected to server', data)
      connectedSocketId.value = data.id
      connectedSocket.value = socket

      startCustomGame(_gameId || 'default')
    })

    socket.on('player-joined', (data: Record<string, string>) => {
      console.log('Player joined', data)
    })
  }

  function startCustomGame(gameId: string) {
    console.log('Creating or joining a custom game', gameId)

    connectedSocket.value?.emit('start-custom-game', { gameId })
  }

  function disconnectSocket(gameId: string) {
    console.log('Disconnecting socket', gameId)

    connectedSocket.value?.disconnect()
  }

  return {
    connectSocket,
    disconnectSocket,
  }
})
