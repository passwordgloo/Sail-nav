<template>
  <div class="min-h-screen w-full">
    <Header @search="handleSearch" />
    <CategoryNav :categories="categories" @select="handleCategorySelect" />
    
    <main class="py-6 md:py-12 w-full">
      <div class="container mx-auto px-4 md:px-8">
        <div 
          v-for="category in filteredCategories" 
          :key="category.id"
          class="mb-8 md:mb-12"
        >
          <h2 
            :class="[
              'text-2xl md:text-3xl font-bold flex items-center gap-2 mb-4 md:mb-6',
              isDark ? 'text-gray-100' : 'text-gray-800'
            ]"
          >
            <span class="text-3xl md:text-4xl">{{ category.icon }}</span>
            {{ category.name }}
          </h2>
          
          <div class="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <LinkCard 
              v-for="(link, index) in category.links" 
              :key="index"
              :link="link"
            />
          </div>
        </div>

        <div v-if="filteredCategories.length === 0" class="text-center py-12 md:py-16 px-4">
          <div class="text-5xl md:text-6xl mb-4">🔍</div>
          <p :class="['text-base md:text-xl', isDark ? 'text-gray-400' : 'text-gray-600']">
            没有找到相关网站
          </p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import Header from '../components/Header.vue'
import CategoryNav from '../components/CategoryNav.vue'
import LinkCard from '../components/LinkCard.vue'
import Footer from '../components/Footer.vue'
import { categories } from '../data/links.js'

const isDark = inject('isDark', ref(false))
const searchQuery = ref('')
const selectedCategory = ref(null)

const filteredCategories = computed(() => {
  let result = categories

  if (selectedCategory.value) {
    result = result.filter(cat => cat.id === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.map(category => ({
      ...category,
      links: category.links.filter(link => 
        link.name.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query)
      )
    })).filter(category => category.links.length > 0)
  }

  return result
})

const handleSearch = (query) => {
  searchQuery.value = query
}

const handleCategorySelect = (categoryId) => {
  selectedCategory.value = categoryId
}
</script>
