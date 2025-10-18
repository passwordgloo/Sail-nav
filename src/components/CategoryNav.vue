<template>
  <nav class="category-nav">
    <div class="category-scroll">
      <div class="category-wrapper">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-btn', { active: activeCategory === category.id }]"
          @click="selectCategory(category.id)"
        >
          <span class="icon">{{ category.icon }}</span>
          <span>{{ category.name }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select'])
const activeCategory = ref(null)

const selectCategory = (id) => {
  activeCategory.value = activeCategory.value === id ? null : id
  emit('select', activeCategory.value)
}
</script>

<style scoped lang="scss">
.category-nav {
  background: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;

  @media (min-width: 768px) {
    padding: 1.5rem 0;
  }

  .category-scroll {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .category-wrapper {
    display: flex;
    gap: 0.75rem;
    padding: 0 1rem;
    min-width: min-content;

    @media (min-width: 768px) {
      justify-content: center;
      flex-wrap: wrap;
      padding: 0 2rem;
      gap: 1rem;
    }
  }

  .category-btn {
    padding: 0.5rem 1.25rem;
    border: 2px solid #cbd5e0;  /* 深灰色边框 */
    background: white;
    border-radius: 50px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    white-space: nowrap;
    flex-shrink: 0;
    color: #4a5568;  /* 深灰色文字 */

    @media (min-width: 768px) {
      padding: 0.6rem 1.5rem;
      font-size: 0.95rem;
      gap: 0.5rem;
    }

    .icon {
      font-size: 1.1rem;

      @media (min-width: 768px) {
        font-size: 1.2rem;
      }
    }

    &:active {
      transform: scale(0.95);
    }

    &:hover {
      border-color: #667eea;
      color: #667eea;

      @media (min-width: 768px) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
      }
    }

    &.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  }
}
</style>
