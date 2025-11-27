<template>
  <header 
    class="w-full transition-all duration-300 bg-gradient-to-br from-[#667eea]/60 to-[#764ba2]/60 backdrop-blur-[30px] backdrop-saturate-200 text-white border-b shadow-lg dark:from-[#4755a3]/50 dark:to-[#58387a]/50 dark:border-white/10 dark:shadow-black/40"
    :class="shouldCollapse ? 'py-6 md:py-8' : 'py-8 md:py-12'"
  >
    <div class="container mx-auto px-4 md:px-8">
      <transition name="collapse">
        <div v-show="!shouldCollapse" class="text-center mb-6 overflow-hidden">
          <h1 class="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
            ☁️ 云帆导航站
          </h1>
          <p class="text-sm md:text-lg opacity-95 drop-shadow">
            <span id="jinrishici-sentence">收藏有用的网站，提高工作效率</span>
          </p>
        </div>
      </transition>
      
      <div class="w-full flex justify-center px-4 md:px-8">
        <div class="relative w-full max-w-3xl xl:max-w-4xl">
          <div 
            class="relative rounded-full transition-all duration-300 backdrop-blur-[15px] backdrop-saturate-180 shadow-lg hover:shadow-xl hover:-translate-y-0.5 dark:shadow-black/30 dark:hover:shadow-black/40 bg-white/90 border border-white/40 dark:bg-slate-700/80 dark:border-white/15"
          >
            <input 
              type="text" 
              v-model="searchQuery"
              @input="handleSearch"
              @focus="handleFocus"
              @blur="handleBlur"
              placeholder="搜索网站..." 
              class="w-full py-4 pr-14 md:pr-16 pl-6 md:pl-7 rounded-full text-base md:text-lg outline-none bg-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 dark:text-gray-100 dark:placeholder-gray-500"
            >
            <span class="absolute right-6 md:right-7 top-1/2 -translate-y-1/2 text-xl md:text-2xl opacity-70 pointer-events-none">
              🔍
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'

const searchQuery = ref('')
const isFocused = ref(false)
const isDark = inject('isDark', ref(false))
const emit = defineEmits(['search'])

const shouldCollapse = computed(() => {
  return isFocused.value && searchQuery.value.length === 0
})

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false
  }, 100)
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js'
  script.charset = 'utf-8'
  script.async = true
  document.head.appendChild(script)
})
</script>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  opacity: 1;
  max-height: 100px;
  margin-bottom: 1.5rem;
}
</style>
