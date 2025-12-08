<template>
  <a 
    :href="link.url" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="flex items-center gap-4 md:gap-5 p-5 md:p-6 rounded-xl no-underline transition-all duration-300 active:scale-95 md:hover:-translate-y-1 relative overflow-hidden"
  >
    <div 
      class="absolute inset-0 rounded-xl backdrop-blur-[12px] backdrop-filter backdrop-saturate-180 border border-white/30 dark:border-white/15 shadow-lg shadow-black/20 dark:shadow-white/5 md:hover:shadow-xl"
    ></div>
    
    <!-- 内容层 -->
    <div 
      class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg backdrop-blur-sm"
    >
      <img 
        v-if="link.icon" 
        :src="link.icon" 
        :alt="link.name"
        @error="handleImageError"
        class="w-8 h-8 md:w-9 md:h-9 object-contain"
      >
      <span class="text-2xl md:text-3xl hidden default-icon">🔗</span>
    </div>
    
    <div class="flex-1 min-w-0 relative">
      <h3 
        class="text-base md:text-lg font-semibold mb-1 text-gray-900 dark:text-white drop-shadow-sm"
      >
        {{ link.name }}
      </h3>
      <p 
        class="text-xs md:text-sm leading-relaxed overflow-hidden line-clamp-2 md:line-clamp-1 text-gray-700 dark:text-gray-300 drop-shadow-sm"
      >
        {{ link.description }}
      </p>
    </div>
    
    <div 
      class="flex-shrink-0 text-2xl md:text-3xl transition-transform duration-300 arrow text-gray-600 dark:text-gray-400 relative"
    >
      →
    </div>
  </a>
</template>

<script setup>
import { inject, ref } from 'vue'

defineProps({
  link: {
    type: Object,
    required: true
  }
})

const isDark = inject('isDark', ref(false))

const handleImageError = (e) => {
  e.target.style.display = 'none'
  e.target.nextElementSibling.classList.remove('hidden')
}
</script>

<style scoped>
@media (min-width: 768px) {
  a:hover .arrow {
    transform: translateX(4px);
  }
}
</style>
