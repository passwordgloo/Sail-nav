<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const url = ref<string | null>(null);
const countdown = ref(5);

onMounted(() => {
  url.value = route.query.url as string;

  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      if (url.value) {
        window.open(url.value, '_blank');
        router.push('/');
      }
    }
  }, 1000);

  // 清除定时器
  return () => clearInterval(timer);
});

const handleJump = () => {
  if (url.value) {
    window.open(url.value, '_blank');
    router.push('/');
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-heo-background p-4">
    <div class="bg-heo-card-bg rounded-xl shadow-lg p-8 max-w-md w-full mx-auto text-center">
      <div class="text-4xl mb-6 text-heo-theme">
        <i class="ri-external-link-line"></i>
      </div>
      <h2 class="text-2xl font-bold mb-4 text-heo-fontcolor">即将跳转到新站点</h2>
      <p class="mb-6 text-heo-secondtext">您即将离开我们的网站，跳转到以下链接：</p>
      <div class="bg-heo-secondbg rounded-lg p-4 mb-6 break-all text-left text-sm">
        {{ url }}
      </div>
      <p class="mb-6 text-heo-secondtext">
        若没有自动跳转，将在 {{ countdown }} 秒后自动跳转，或点击下方按钮立即跳转
      </p>
      <button
        @click="handleJump"
        class="w-full bg-heo-theme hover:bg-heo-theme-op-deep text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
      >
        立即跳转
      </button>
      <button
        @click="router.push('/')"
        class="w-full mt-3 bg-transparent border border-heo-card-border text-heo-fontcolor font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:border-heo-theme"
      >
        取消
      </button>
    </div>
  </div>
</template>