<script setup lang="ts">
import { ref } from 'vue';
import { linkGroups } from '../linkGroups';
import { useRouter } from 'vue-router';

export interface LinkGroup {
  id: string;
  icon: string;
  links: Array<{
    title: string;
    desc: string;
    url: string;
    logo: string;
  }>;
}

const router = useRouter();
const activeGroup = ref<string | null>(null);

const scrollToGroup = (groupId: string) => {
  activeGroup.value = groupId;
  const element = document.getElementById(`group-${groupId}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleSiteClick = (url: string) => {
  router.push({ name: 'jump', query: { url } });
};
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- 侧边栏 -->
    <aside class="nav-list">
      <div class="site-logo">
        <img src="/logo.png" alt="Logo" class="h-20 w-auto" />
      </div>
      <div class="left-nav-group">
        <div v-for="group in linkGroups" :key="group.id" class="left_nav_item">
          <a
            @click="scrollToGroup(group.id)"
            :class="['left_nav_link_group_title', { 'bg-heo-secondbg': activeGroup === group.id }]"
          >
            <i :class="group.icon"></i>
            <span>{{ group.id }}</span>
          </a>
        </div>
        <div class="left_nav_item mt-auto">
          <a
            @click="() => router.push('/import')"
            class="left_nav_link_group_title"
          >
            <i class="ri-upload-2-fill"></i>
            <span>导入站点</span>
          </a>
        </div>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="linkPage-content overflow-y-auto">
      <div class="site-info-group">
        <img src="/cover.jpg" alt="封面" class="site_info_group_back_cover" />
        <div class="site-info-text">
          <h1 class="site_info_group_title text-3xl font-bold text-white text-shadow">Sail Nav</h1>
          <span class="site_info_group_desc text-white bg-black bg-opacity-30 px-2 py-1 rounded">
            一站式导航平台，让您的网络生活更高效
          </span>
        </div>
      </div>

      <!-- 站点分组 -->
      <div v-for="group in linkGroups" :key="group.id" :id="`group-${group.id}`" class="link_group">
        <h2 class="link_group_title_content font-bold text-lg">
          <i :class="group.icon" class="mr-2"></i>
          {{ group.id }}
        </h2>
        <div class="link_group_content">
          <a
            v-for="link in group.links"
            :key="link.url"
            @click.prevent="handleSiteClick(link.url)"
            class="link_group_content_link"
          >
            <div class="link_group_content_item_logo w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-heo-secondbg mr-3">
              <img :src="link.logo" alt="{{ link.title }}" class="w-10 h-10 object-cover rounded-full" />
            </div>
            <div class="link_group_content_item_info flex-1 flex flex-col justify-center">
              <p class="link_group_content_item_info_content_title font-bold text-base truncate">{{ link.title }}</p>
              <p class="link_group_content_item_info_content_description text-sm opacity-80 line-clamp-2">{{ link.desc }}</p>
            </div>
          </a>
        </div>
      </div>

      <!-- 页脚 -->
      <footer class="footer mt-auto">
        <div class="footer_icp_group text-center text-sm opacity-60">
          <p>© 2023 Sail Nav. All rights reserved.</p>
        </div>
      </footer>
    </main>
  </div>
</template>