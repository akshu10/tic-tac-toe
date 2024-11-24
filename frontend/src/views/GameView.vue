<script setup lang="ts"></script>

<template>
  <main>
    <div class="flex items-end justify-end px-12 pt-12">
      <n-space>
        <n-button dashed type="primary"> Quit </n-button>
      </n-space>
    </div>

    <section class="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-black">
      <!-- Button-->

      <table class="table-fixed w-64 h-64 text-center">
        <tbody class="border-4 border-yellow-200">
          <tr class="border-4 border-yellow-200">
            <td class="border-r-4 border-yellow-200 cursor-pointer bg-teal-200">1</td>
            <td class="border-r-4 border-yellow-200 cursor-pointer bg-teal-200">2</td>
            <td class="cursor-pointer bg-teal-200">3</td>
          </tr>
          <tr class="border-4 border-yellow-200">
            <td class="border-r-4 border-yellow-200 cursor-pointer bg-teal-200">4</td>
            <td class="border-r-4 border-yellow-200 cursor-pointer bg-teal-200">5</td>
            <td class="cursor-pointer bg-teal-200">6</td>
          </tr>
          <tr>
            <td class="border-r-4 border-yellow-200 cursor-pointer bg-teal-200">7</td>
            <td class="border-r-4 border-yellow-200 cursor-pointer bg-teal-200">8</td>
            <td class="cursor-pointer bg-teal-200">9</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
