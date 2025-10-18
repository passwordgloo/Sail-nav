<template>
  <header 
    class="header"
    :class="{ collapsed: shouldCollapse }"
  >
    <div class="container">
      <transition name="collapse">
        <div v-show="!shouldCollapse" class="header-content">
          <h1 class="site-title">☁️ 云帆导航</h1>
          <p class="site-description">
            <span id="jinrishici-sentence">收藏有用的网站，提高工作效率</span>
          </p>
        </div>
      </transition>
      
      <div class="search-wrapper">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery"
            @input="handleSearch"
            @focus="handleFocus"
            @blur="handleBlur"
            placeholder="搜索网站..." 
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const isFocused = ref(false)
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

// 加载今日诗词脚本
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js'
  script.charset = 'utf-8'
  script.async = true
  document.head.appendChild(script)
})
</script>

<style scoped lang="scss">
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: padding 0.3s ease;

  @media (min-width: 768px) {
    padding: 3rem 0;
  }

  &.collapsed {
    padding: 1.5rem 0;

    @media (min-width: 768px) {
      padding: 2rem 0;
    }
  }

  .container {
    width: 100%;
  }

  .header-content {
    text-align: center;
    margin-bottom: 1.5rem;
    overflow: hidden;
  }

  .site-title {
    font-size: 1.75rem;
    margin: 0 0 0.5rem 0;
    font-weight: 700;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .site-description {
    font-size: 0.9rem;
    opacity: 0.9;
    margin: 0;
    min-height: 1.5em;
    transition: opacity 0.3s ease;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }

    #jinrishici-sentence {
      display: inline-block;
    }
  }

  .search-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 1rem;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }
  }

  .search-box {
    position: relative;
    width: 100%;
    max-width: 800px;

    @media (min-width: 1440px) {
      max-width: 1000px;
    }

    .search-input {
      width: 100%;
      padding: 1rem 3.5rem 1rem 1.5rem;
      border: none;
      border-radius: 50px;
      font-size: 0.95rem;
      outline: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s;
      background: white;
      color: #2d3748;

      @media (min-width: 768px) {
        padding: 1.125rem 4rem 1.125rem 1.75rem;
        font-size: 1rem;
      }

      &:focus {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        transform: translateY(-2px);
      }

      &::placeholder {
        color: #999;
      }
    }

    .search-icon {
      position: absolute;
      right: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
      pointer-events: none;
      color: #667eea;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (min-width: 768px) {
        right: 1.75rem;
        font-size: 1.3rem;
      }
    }
  }
}

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
