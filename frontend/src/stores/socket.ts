import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { io } from 'socket.io-client'
import type { Socket as SocketType } from 'socket.io-client'

let connectedSocket: SocketType | undefined

interface SocketStore {
  connectedSocket: Ref<SocketType | undefined>
  connectSocket: () => void
  disconnectSocket: () => void
  setGameId: (gameId: string) => void
  move: (board: (string | null)[][]) => void
  getDisableBoard: () => boolean
}

export const useSocketStore = defineStore('socket', (): SocketStore => {
  const connectedSocket = ref<SocketType | undefined>()
  const connectedSocketId = ref<string | null>()
  const router = useRouter()
  const customGameId = ref<string | null>()
  const disableBoard = ref<boolean>(true)

  /**
   *
   * @param _gameId - game id to join or create a custom game
   *
   * Connects to the socket server and initiates the starting of a custom game, if the game id
   * is provided.
   */
  function connectSocket() {
    // if game id is provided, user intends to join/create a custom game
    const socket = io('http://localhost:8080', {})

    socket.on('connection', (data: Record<string, string>) => {
      connectedSocketId.value = data.id
      connectedSocket.value = socket

      if (customGameId.value) {
        startCustomGame(customGameId.value)
      }
    })

    socket.on('player:joined', (data: Record<string, string>) => {
      console.log('Player joined', data)
    })

    socket.on('waiting-for-player', (data: Record<string, string>) => {
      console.log('Waiting for player 2 to join custom game', data)
      disableBoard.value = false
    })

    socket.on('game-room-full', (data: Record<string, string>) => {
      console.log('Game room full', data)
    })

    socket.on('player-disconnected', (data: Record<string, string>) => {
      console.log('Player disconnected', data)

      router.push('/')
    })
  }

  function startCustomGame(gameId: string) {
    console.log('Creating or joining a custom game', gameId)

    connectedSocket?.value?.emit('start-custom-game', { gameId })
  }

  function customDisconnectSocket() {
    connectedSocket?.value?.emit('custom-disconnect', { gameRoomId: customGameId.value })

    connectedSocket?.value?.disconnect()
    connectedSocket.value = undefined
    connectedSocketId.value = null
    customGameId.value = null

    router.push('/')
  }

  function disconnectSocket() {
    customDisconnectSocket()
  }

  function setGameId(gameId: string) {
    customGameId.value = gameId
  }

  function move(board: (string | null)[][]) {
    connectedSocket?.value?.emit('move', { board })
  }

  function getDisableBoard() {
    return disableBoard.value
  }

  return {
    connectedSocket,
    connectSocket,
    disconnectSocket,
    setGameId,
    move,
    getDisableBoard,
  }
})

export { connectedSocket }
