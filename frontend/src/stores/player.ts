import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const playerName = ref<string | null>()

  function setPlayerName(name: string) {
    playerName.value = name
  }

  function getPlayerName() {
    return playerName.value
  }

  return {
    setPlayerName,
    getPlayerName,
  }
})
