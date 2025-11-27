<template>
  <a 
    :href="link.url" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="flex items-center gap-4 md:gap-5 p-5 md:p-6 rounded-xl border no-underline backdrop-blur-[15px] backdrop-saturate-180 transition-all duration-300 active:translate-y-0 md:hover:-translate-y-1 bg-white/70 border-white/30 shadow-md shadow-gray-900/10 md:hover:shadow-xl md:hover:shadow-[#667eea]/20 md:hover:border-[#667eea]/30 dark:bg-slate-700/70 dark:border-white/10 dark:shadow-lg dark:shadow-black/20 dark:md:hover:shadow-xl dark:md:hover:shadow-[#4755a3]/20 dark:md:hover:border-[#4755a3]/30"
  >
    <div 
      class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
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
    
    <div class="flex-1 min-w-0">
      <h3 
        class="text-base md:text-lg font-semibold mb-1 text-gray-900 dark:text-gray-50"
      >
        {{ link.name }}
      </h3>
      <p 
        class="text-xs md:text-sm leading-relaxed overflow-hidden line-clamp-2 md:line-clamp-1 text-gray-600 dark:text-gray-400"
      >
        {{ link.description }}
      </p>
    </div>
    
    <div 
      class="flex-shrink-0 text-2xl md:text-3xl transition-transform duration-300 arrow text-gray-300 dark:text-gray-600"
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
