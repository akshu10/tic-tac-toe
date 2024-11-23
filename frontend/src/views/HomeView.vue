<script setup lang="ts"></script>

<template>
  <div class="flex h-screen justify-center items-center bg-gray-700">
    <div class="mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
      <label class="block text-black font-bold mb-5 text-lg tracking-wider" htmlFor="game-room-id">
        Game Room ID
      </label>
      <input
        class="border rounded-md w-full h-14 py-2 px-3 mb-6 text-black placeholder-gray-400 bg-gray-200 ring-2 focus:ring-lime-500 hover:ring-lime-500 focus:outline-none focus:shadow-outline tracking-widest"
        id="game-room-id"
        type="text"
        placeholder="5wec1"
      />

      <div class="mb-4">
        <button
          class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline tracking-widest text-2xl font-mono bg-yellow-200 cursor-pointer"
          type="button"
          @click="() => $router.push('/game')"
        >
          START GAME
        </button>
      </div>
    </div>
  </div>
</template>
