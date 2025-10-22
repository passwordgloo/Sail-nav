<template>
  <footer 
    :class="[
      'w-full py-8 md:py-10 text-center mt-12 md:mt-16',
      'backdrop-blur-[20px] backdrop-saturate-180',
      'border-t shadow-sm',
      isDark 
        ? 'bg-slate-700/60 border-white/10 shadow-black/20'
        : 'bg-white/60 border-white/30 shadow-gray-900/10'
    ]"
  >
    <div class="container mx-auto px-4">
      <p :class="['text-sm md:text-base mb-2', isDark ? 'text-gray-300' : 'text-gray-600']">
        © 2025 我的导航站
      </p>
      <p :class="['text-xs md:text-sm', isDark ? 'text-gray-400' : 'text-gray-500']">
        Made with ❤️ using Vue 3 + Vite + Tailwind CSS v4
      </p>
    </div>
  </footer>
</template>

<script setup>
import { inject, ref } from 'vue'

const isDark = inject('isDark', ref(false))
</script>
