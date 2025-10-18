<template>
  <div class="home">
    <Header @search="handleSearch" />
    <CategoryNav :categories="categories" @select="handleCategorySelect" />
    
    <main class="main-content">
      <div class="container">
        <div 
          v-for="category in filteredCategories" 
          :key="category.id"
          class="category-section"
        >
          <h2 class="category-title">
            <span class="icon">{{ category.icon }}</span>
            {{ category.name }}
          </h2>
          <div class="links-grid">
            <LinkCard 
              v-for="(link, index) in category.links" 
              :key="index"
              :link="link"
            />
          </div>
        </div>

        <div v-if="filteredCategories.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>没有找到相关网站</p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'
import CategoryNav from '../components/CategoryNav.vue'
import LinkCard from '../components/LinkCard.vue'
import Footer from '../components/Footer.vue'
import { categories } from '../data/links.js'

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

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background: #f7fafc;
  width: 100%;
}

.main-content {
  padding: 1.5rem 0;
  width: 100%;

  @media (min-width: 768px) {
    padding: 3rem 0;
  }
}

.category-section {
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 3rem;
  }

  .category-title {
    font-size: 1.4rem;
    margin: 0 0 1rem 0;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 768px) {
      font-size: 1.8rem;
      margin: 0 0 1.5rem 0;
    }

    .icon {
      font-size: 1.6rem;

      @media (min-width: 768px) {
        font-size: 2rem;
      }
    }
  }

  .links-grid {
    display: grid;
    gap: 1rem;
    
    // 移动端：单列
    grid-template-columns: 1fr;

    // 小平板：双列
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    // 平板：三列
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    // 桌面端：四列
    @media (min-width: 1440px) {
      grid-template-columns: repeat(4, 1fr);
    }

    // 超大屏：五列
    @media (min-width: 1920px) {
      grid-template-columns: repeat(5, 1fr);
      gap: 2rem;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      font-size: 4rem;
    }
  }

  p {
    font-size: 1rem;
    color: #718096;

    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }
}
</style>
