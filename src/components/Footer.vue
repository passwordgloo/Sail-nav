<template>
  <footer class="footer">
    <div class="container">
      <p>© 2025 云帆导航</p>
      <p class="made-with">Using Vue 3 + Vite 6</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: white;
  padding: 1.5rem 0;
  text-align: center;
  border-top: 1px solid #e2e8f0;
  margin-top: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 2rem 0;
    margin-top: 4rem;
  }

  p {
    margin: 0;
    color: #718096;
    font-size: 0.875rem;

    @media (min-width: 768px) {
      font-size: 1rem;
    }

    &.made-with {
      margin-top: 0.5rem;
      font-size: 0.8rem;

      @media (min-width: 768px) {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
