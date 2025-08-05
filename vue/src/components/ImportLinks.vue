<script setup lang="ts">
import { ref } from 'vue';
import { linkGroups } from '../linkGroups';
import { useRouter } from 'vue-router';

const router = useRouter();
const groupSelector = ref('new');
const newGroupName = ref('');
const groupIcon = ref('');
const siteTitle = ref('');
const siteDesc = ref('');
const siteUrl = ref('');
const siteLogo = ref('');
const jsonData = ref('');
const importMethod = ref('manual');

// 更新链接组数据并保存到localStorage
const updateLinkGroups = () => {
  // 实际应用中，这里应该将数据保存到服务器或本地存储
  console.log('更新后的链接组数据:', linkGroups);
  alert('站点数据已更新！');
  router.push('/');
};

// 手动添加站点
const handleManualAdd = () => {
  if (groupSelector.value === 'new' && !newGroupName.value.trim()) {
    alert('请为新分组输入名称');
    return;
  }
  if (!siteTitle.value.trim() || !siteUrl.value.trim()) {
    alert('站点名称和网址为必填项');
    return;
  }

  try {
    new URL(siteUrl.value.trim());
  } catch (e) {
    alert('请提供完整的网址，包含 http(s)://');
    return;
  }

  let targetGroup;
  if (groupSelector.value === 'new') {
    targetGroup = {
      id: newGroupName.value.trim(),
      icon: groupIcon.value.trim() || 'ri-folder-open-fill',
      links: []
    };
    linkGroups.push(targetGroup);
  } else {
    targetGroup = linkGroups.find(g => g.id === groupSelector.value);
  }

  if (targetGroup) {
    targetGroup.links.push({
      title: siteTitle.value.trim(),
      desc: siteDesc.value.trim(),
      url: siteUrl.value.trim(),
      logo: siteLogo.value.trim() || `https://favicon.im/${new URL(siteUrl.value.trim()).hostname}`
    });

    updateLinkGroups();
  }
};

// 导入JSON数据
const handleJsonImport = () => {
  try {
    const importedData = JSON.parse(jsonData.value.trim());
    if (Array.isArray(importedData)) {
      // 替换现有链接组
      linkGroups.length = 0;
      importedData.forEach(group => linkGroups.push(group));
      updateLinkGroups();
    } else {
      alert('请提供有效的链接组JSON数组');
    }
  } catch (e) {
    alert('JSON格式无效: ' + e.message);
  }
};
</script>

<template>
  <div class="min-h-screen bg-heo-background p-4 flex flex-col items-center">
    <div class="bg-heo-card-bg rounded-xl shadow-lg p-6 max-w-2xl w-full mx-auto">
      <h1 class="text-2xl font-bold mb-6 text-center text-heo-fontcolor">站点管理器</h1>

      <div class="mb-6">
        <label class="block mb-2 font-medium text-heo-fontcolor">导入方式</label>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="importMethod" value="manual" class="text-heo-theme" />
            <span>手动添加</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="importMethod" value="json" class="text-heo-theme" />
            <span>JSON导入</span>
          </label>
        </div>
      </div>

      <!-- 手动添加表单 -->
      <div v-if="importMethod === 'manual'" class="space-y-4">
        <div>
          <label class="block mb-2 font-medium text-heo-fontcolor">选择现有分组或新建</label>
          <select v-model="groupSelector" class="w-full p-2 border border-heo-card-border rounded-lg focus:outline-none focus:border-heo-theme">
            <option value="new">新建分组</option>
            <option v-for="group in linkGroups" :key="group.id" :value="group.id">{{ group.id }}</option>
          </select>
        </div>

        <div v-if="groupSelector === 'new'">
          <label class="block mb-2 font-medium text-heo-fontcolor">新分组名称</label>
          <input v-model="newGroupName" type="text" placeholder="请输入新分组名称" class="w-full p-2 border border-heo-card-border rounded-lg focus:outline-none focus:border-heo-theme" />
        </div>

        <div v-if="groupSelector === 'new'">
          <label class="block mb-2 font-medium text-heo-fontcolor">分组图标（remixicon 类名）</label>
          <input v-model="groupIcon" type="text" placeholder="如 ri-apps-fill" class="w-full p-2 border border-heo-card-border rounded-lg focus:outline-none focus:border-heo-theme" />
        </div>

        <div>
          <label class="block mb-2 font-medium text-heo-fontcolor">站点名称</label>
          <input v-model="siteTitle" type="text" required placeholder="请输入站点名称" class="w-full p-2 border border-heo-card-border rounded-lg focus:outline-none focus:border-heo-theme" />
        </div>

        <div>
          <label class="block mb-2 font-medium text-heo-fontcolor">站点描述</label>
          <input v-model="siteDesc" type="text" placeholder="请输入站点描述" class="w-full p-2 border border-heo-card-border rounded-lg focus:outline-none focus:border-heo-theme" />
        </div>

        <div>
          <label class="block mb-2 font-medium text-heo-fontcolor">站点 URL（必须）</label>
          <input v-model="siteUrl" type="text" required placeholder="请输入完整网址，包含 http(s)://" class="w-full p-2 border border-heo-card-border rounded-lg focus:outline-none focus:border-heo-theme" />
        </div>

        <div>
          <label class="block mb-2 font-medium text-heo-fontcolor">图标 URL（可选，默认为 favicon）</label>
          <input v-model="siteLogo" type="text" placeholder="可选" class="w-full p-2 border border-heo-card-border rounded-lg focus:outline-none focus:border-heo-theme" />
        </div>

        <button @click="handleManualAdd" class="w-full bg-heo-theme hover:bg-heo-theme-op-deep text-white font-medium py-3 px-4 rounded-lg transition-all duration-300">
          添加站点
        </button>
      </div>

      <!-- JSON导入表单 -->
      <div v-else class="space-y-4">
        <div>
          <label class="block mb-2 font-medium text-heo-fontcolor">链接组 JSON 数据</label>
          <textarea v-model="jsonData" rows="8" placeholder="粘贴链接组JSON数据" class="w-full p-2 border border-heo-card-border rounded-lg focus:outline-none focus:border-heo-theme"></textarea>
          <p class="text-xs text-heo-secondtext mt-1">格式示例: [{"id":"分组名称","icon":"图标类名","links":[{"title":"站点名称","desc":"描述","url":"网址","logo":"图标URL"}]}]</p>
        </div>

        <button @click="handleJsonImport" class="w-full bg-heo-theme hover:bg-heo-theme-op-deep text-white font-medium py-3 px-4 rounded-lg transition-all duration-300">
          导入数据
        </button>
      </div>

      <div class="mt-6 text-center">
        <button @click="router.push('/')" class="text-heo-theme hover:underline">返回首页</button>
      </div>
    </div>
  </div>
</template>