<template>
  <nav 
    :class="[
      'sticky top-0 z-50 w-full py-4 md:py-6',
      'backdrop-blur-[20px] backdrop-saturate-180',
      'shadow-sm border-b',
      isDark 
        ? 'bg-slate-700/60 border-white/10 shadow-black/20'
        : 'bg-white/60 border-white/30 shadow-gray-900/10'
    ]"
  >
    <div class="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
      <div class="flex gap-3 px-4 md:px-8 md:justify-center md:flex-wrap min-w-min md:gap-4">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="[
            'py-2 px-5 md:py-2.5 md:px-6 rounded-full',
            'text-sm md:text-base font-medium',
            'flex items-center gap-2 whitespace-nowrap flex-shrink-0',
            'transition-all duration-300',
            'backdrop-blur-[10px] backdrop-saturate-150',
            'active:scale-95 md:hover:-translate-y-0.5',
            activeCategory === category.id
              ? 'bg-gradient-to-r from-[#667eea]/90 to-[#764ba2]/90 text-white border-transparent shadow-lg dark:from-[#4755a3]/90 dark:to-[#58387a]/90'
              : isDark
                ? 'bg-slate-600/70 text-gray-200 border border-white/10 hover:shadow-lg'
                : 'bg-white/70 text-gray-700 border border-white/30 hover:shadow-md hover:border-[#667eea]/30'
          ]"
          @click="selectCategory(category.id)"
        >
          <span class="text-lg md:text-xl">{{ category.icon }}</span>
          <span>{{ category.name }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, inject } from 'vue'

defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const isDark = inject('isDark', ref(false))
const emit = defineEmits(['select'])
const activeCategory = ref(null)

const selectCategory = (id) => {
  activeCategory.value = activeCategory.value === id ? null : id
  emit('select', activeCategory.value)
}
</script>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
