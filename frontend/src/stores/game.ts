import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSocketStore } from './socket'

export const useGameStore = defineStore('game', () => {
  const { connectedSocket } = useSocketStore()
  const playerName = ref<string | null>()
  const squares = ref<(string | null)[][]>(new Array(3))
  const xIsNext = ref(true)

  function setPlayerName(name: string) {
    playerName.value = name
  }

  function getPlayerName() {
    return playerName.value
  }

  // socket events
  if (connectedSocket) {
    connectedSocket.on('board:refresh', (data: Record<string, string>) => {
      console.log('Move event', data)
    })
  }

  return {
    setPlayerName,
    getPlayerName,
    squares,
    xIsNext,
  }
})
