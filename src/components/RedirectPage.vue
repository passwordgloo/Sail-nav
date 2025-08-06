<template>
  <div class="redirect-container">
    <div class="redirect-card">
      <h2>即将跳转到新的站点</h2>
      <p class="site-info">{{ siteTitle }}</p>
      <p class="site-url">{{ siteUrl }}</p>
      <button @click="redirectToSite">立即跳转</button>
      <p class="countdown" v-if="countdown > 0">
        或将在 {{ countdown }} 秒后自动跳转...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const siteTitle = ref('');
const siteUrl = ref('');
const countdown = ref(5);
let countdownInterval: number | null = null;

onMounted(() => {
  // 获取路由参数
  const title = route.query.title as string;
  const url = route.query.url as string;

  if (title && url) {
    siteTitle.value = title;
    siteUrl.value = url;

    // 开始倒计时
    countdownInterval = window.setInterval(() => {
      countdown.value -= 1;
      if (countdown.value <= 0) {
        redirectToSite();
      }
    }, 1000);
  } else {
    // 如果没有参数，返回首页
    router.push('/');
  }
});

onUnmounted(() => {
  // 清除定时器
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

function redirectToSite() {
  window.open(siteUrl.value, '_blank');
  router.push('/');
}
</script>

<style scoped>
.redirect-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.redirect-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.site-info {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
}

.site-url {
  font-size: 14px;
  color: #646cff;
  margin-bottom: 30px;
  word-break: break-all;
}

button {
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}

button:hover {
  background-color: #535bf2;
}

.countdown {
  font-size: 14px;
  color: #777;
}

@media (prefers-color-scheme: dark) {
  .redirect-container {
    background-color: #242424;
  }

  .redirect-card {
    background-color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  h2 {
    color: white;
  }

  .site-info {
    color: #ddd;
  }

  .countdown {
    color: #aaa;
  }
}
</style>