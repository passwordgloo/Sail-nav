<template>
  <a :href="link.url" target="_blank" rel="noopener noreferrer" class="link-card">
    <div class="card-icon">
      <img 
        v-if="link.icon" 
        :src="link.icon" 
        :alt="link.name"
        @error="handleImageError"
      >
      <span class="default-icon">🔗</span>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ link.name }}</h3>
      <p class="card-description">{{ link.description }}</p>
    </div>
    <div class="card-arrow">→</div>
  </a>
</template>

<script setup>
defineProps({
  link: {
    type: Object,
    required: true
  }
})

const handleImageError = (e) => {
  e.target.style.display = 'none'
  e.target.nextElementSibling.style.display = 'flex'
}
</script>

<style scoped lang="scss">
.link-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  width: 100%;

  @media (min-width: 768px) {
    gap: 1rem;
    padding: 1.5rem;
  }

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    border-color: #667eea;

    @media (min-width: 768px) {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
    }

    .card-arrow {
      @media (min-width: 768px) {
        transform: translateX(4px);
      }
    }
  }

  .card-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7fafc;
    border-radius: 8px;

    @media (min-width: 768px) {
      width: 48px;
      height: 48px;
      border-radius: 10px;
    }

    img {
      width: 28px;
      height: 28px;
      object-fit: contain;

      @media (min-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }

    .default-icon {
      font-size: 1.3rem;
      display: none;

      @media (min-width: 768px) {
        font-size: 1.5rem;
      }
    }
  }

  .card-content {
    flex: 1;
    min-width: 0;
  }

  .card-title {
    margin: 0 0 0.25rem 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #2d3748;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .card-description {
    margin: 0;
    font-size: 0.8rem;
    color: #718096;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.4;

    @media (min-width: 768px) {
      font-size: 0.9rem;
      -webkit-line-clamp: 1;
      white-space: nowrap;
      display: block;
    }
  }

  .card-arrow {
    flex-shrink: 0;
    font-size: 1.3rem;
    color: #cbd5e0;
    transition: transform 0.3s;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
}
</style>
