import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { io } from 'socket.io-client'
import type { Socket as SocketType } from 'socket.io-client'

let connectedSocket: SocketType | undefined

interface SocketStore {
  connectedSocket: Ref<SocketType | undefined>
  selfTurn: Ref<boolean>
  board: Ref<(string | null)[][]>
  connectSocket: () => void
  disconnectSocket: () => void
  setGameId: (gameId: string) => void
  setPlayerName: (playerName: string) => void
  getDisableBoard: () => boolean
  toggleSelfTurn: () => void
  emitMoveEvent: () => void
}

export const useSocketStore = defineStore('socket', (): SocketStore => {
  const connectedSocket = ref<SocketType | undefined>()
  const connectedSocketId = ref<string | null>()
  const router = useRouter()
  const customGameId = ref<string | null>()
  const playerName = ref<string | null>()
  const disableBoard = ref<boolean>(false)
  const selfTurn = ref<boolean>(false)
  const board = ref<(string | null)[][]>(new Array(3).fill(null).map(() => new Array(3).fill(null)))

  /**
   * Connects to the socket server and initiates the starting of a custom game, if the game id
   * is provided.
   */
  function connectSocket() {
    // if game id is provided, user intends to join/create a custom game
    const socket = io('http://localhost:8080', {})

    socket.on('connection', (data: { id: string }) => {
      connectedSocketId.value = data.id
      connectedSocket.value = socket

      if (customGameId.value) {
        startCustomGame(customGameId.value)
      }
    })

    socket.on('game:start', (data: { gameId: string; turn: string }) => {
      // get first players turn
      if (data.turn === connectedSocketId.value) {
        selfTurn.value = true
      } else {
        selfTurn.value = false
      }

      // enable the board
      disableBoard.value = false
    })

    socket.on('player:waiting', () => {
      disableBoard.value = true
    })

    socket.on('game:full', (data: { gameId: string }) => {
      console.log('Game room full', data)
    })

    socket.on('board:refresh', (data: { gameId: string; board: (string | null)[][] }) => {
      console.log('Board refresh', data)

      // update the board
      board.value = data.board
    })
  }

  function startCustomGame(gameId: string) {
    connectedSocket?.value?.emit('game:custom', { gameId })
  }

  function customDisconnectSocket() {
    connectedSocket?.value?.emit('custom:disconnect', { gameRoomId: customGameId.value })

    connectedSocket?.value?.disconnect()
    connectedSocket.value = undefined
    connectedSocketId.value = null
    customGameId.value = null
    playerName.value = null
    disableBoard.value = true
    selfTurn.value = false
    board.value = new Array(3).fill(null).map(() => new Array(3).fill(null))

    router.push('/')
  }

  function disconnectSocket() {
    customDisconnectSocket()
  }

  function setGameId(gameId: string) {
    customGameId.value = gameId
  }

  function getDisableBoard() {
    return disableBoard.value
  }

  function setPlayerName(input: string) {
    playerName.value = input
  }

  function toggleSelfTurn() {
    selfTurn.value = !selfTurn.value
  }

  function emitMoveEvent() {
    connectedSocket?.value?.emit('player:move', { gameId: customGameId.value, board: board.value })
  }

  return {
    connectedSocket,
    board,
    connectSocket,
    disconnectSocket,
    setGameId,
    getDisableBoard,
    setPlayerName,
    selfTurn,
    toggleSelfTurn,
    emitMoveEvent,
  }
})

export { connectedSocket }
