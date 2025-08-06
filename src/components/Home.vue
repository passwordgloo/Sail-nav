<template>
  <div class="home-container">

    <div class="main-content">
      <aside class="sidebar">
        <a class="site_logo" href="#">
        <img src="/src/assets/logo.png" alt="logo" />
      </a>
        <nav>
          <ul>
            <li v-for="group in linkGroups" :key="group.id">
              <a
                href="#{{ group.id }}"
                @click.prevent="scrollToGroup(group.id)"
                class="group-link"
              >
                <i :class="group.icon"></i>
                <span>{{ group.id }}</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="site-content">
        <section
          v-for="group in linkGroups"
          :key="group.id"
          :id="group.id"
          class="site-group"
        >
          <h2 class="group-title">
            <i :class="group.icon"></i>
            {{ group.id }}
          </h2>

          <div class="site-grid">
            <div
              v-for="site in group.links"
              :key="site.url"
              class="site-card"
              @click="redirectToSite(site.title, site.url)"
            >
              <div class="site-logo">
                <img :src="site.logo" :alt="site.title">
              </div>
              <div class="site-info">
                <h3 class="site-title">{{ site.title }}</h3>
                <p class="site-desc">{{ site.desc }}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer>
      <p>© 2025 云帆导航 | <router-link to="/add-site">添加站点</router-link></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { linkGroups } from '../data/links';

const router = useRouter(); // 初始化router

function scrollToGroup(groupId: string) {
  const element = document.getElementById(groupId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function redirectToSite(title: string, url: string) {
  router.push({
    path: '/redirect',
    query: { title, url }
  });
}
</script>

<style lang="scss" scoped src="../styles.scss">
</style>