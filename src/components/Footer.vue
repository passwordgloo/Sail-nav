<template>
  <footer 
    class="w-full py-8 md:py-10 text-center mt-12 md:mt-16 backdrop-blur-[20px] backdrop-saturate-180 border-t shadow-sm bg-white/60 border-white/30 shadow-gray-900/10 dark:bg-slate-700/60 dark:border-white/10 dark:shadow-black/20"
  >
    <div class="container mx-auto px-4">
      <p class="text-sm md:text-base text-gray-600 dark:text-gray-300">
        © 2025 云帆导航站
      </p>
    </div>
  </footer>
</template>

<script setup>
import { inject, ref } from 'vue'

const isDark = inject('isDark', ref(false))
</script>
