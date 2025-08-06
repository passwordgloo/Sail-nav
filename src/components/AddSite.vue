<template>
  <div class="add-site-container">
    <div class="header">
      <h1>站点管理器</h1>
      <router-link to="/" class="back-home">返回首页</router-link>
    </div>

    <fieldset>
      <legend>添加站点</legend>
      <label for="groupSelector">选择现有分组或新建</label>
      <select id="groupSelector" v-model="selectedGroup">
        <option value="new">新建分组</option>
        <option v-for="group in linkGroups" :key="group.id" :value="group.id">{{ group.id }}</option>
      </select>
      <input
        id="newGroupInput"
        type="text"
        placeholder="请输入新分组名称"
        v-model="newGroupName"
        :disabled="selectedGroup !== 'new'"
      >

      <label for="groupIcon">分组图标（remixicon 类名）</label>
      <input
        id="groupIcon"
        type="text"
        placeholder="如 ri-apps-fill"
        v-model="groupIcon"
      >

      <label for="siteTitle">站点名称</label>
      <input
        id="siteTitle"
        type="text"
        required
        v-model="siteTitle"
      >

      <label for="siteDesc">站点描述</label>
      <input
        id="siteDesc"
        type="text"
        required
        v-model="siteDesc"
      >

      <label for="siteUrl">站点 URL（必须）</label>
      <input
        id="siteUrl"
        type="text"
        required
        v-model="siteUrl"
      >

      <label for="siteLogo">图标 URL（可选，默认为 favicon）</label>
      <input
        id="siteLogo"
        type="text"
        placeholder="可选"
        v-model="siteLogo"
      >

      <button @click="addSite">添加站点</button>
    </fieldset>

    <fieldset class="group-list">
      <legend>当前分组和站点列表（可编辑）</legend>
      <pre>{{ jsonPreview }}</pre>
    </fieldset>

    <fieldset class="group-list">
      <legend>保存更新后的 JS 文件</legend>
      <p>点击按钮保存当前更新为 JS 文件（不会覆盖原文件）</p>
      <button @click="saveToFile">保存链接为 JS 文件</button>

      <a ref="dlLink"></a>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { linkGroups } from '../data/links';

const selectedGroup = ref('new');
const newGroupName = ref('');
const groupIcon = ref('');
const siteTitle = ref('');
const siteDesc = ref('');
const siteUrl = ref('');
const siteLogo = ref('');
const dlLink = ref<HTMLAnchorElement | null>(null);

const jsonPreview = computed(() => {
  return JSON.stringify(linkGroups, null, 2);
});

function addSite() {
  if (selectedGroup.value === 'new' && !newGroupName.value.trim()) {
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

  const siteLogoValue = siteLogo.value.trim() || `https://favicon.im/${new URL(siteUrl.value.trim()).hostname}`;

  let targetGroup;
  if (selectedGroup.value === 'new') {
    targetGroup = {
      id: newGroupName.value.trim(),
      icon: groupIcon.value.trim(),
      links: []
    };
    linkGroups.push(targetGroup);
  } else {
    targetGroup = linkGroups.find(g => g.id === selectedGroup.value);
  }

  if (targetGroup) {
    targetGroup.links.push({
      title: siteTitle.value.trim(),
      desc: siteDesc.value.trim(),
      url: siteUrl.value.trim(),
      logo: siteLogoValue
    });

    alert('站点已添加至：' + targetGroup.id);
    resetForm();
  }
}

function resetForm() {
  newGroupName.value = '';
  groupIcon.value = '';
  siteTitle.value = '';
  siteDesc.value = '';
  siteUrl.value = '';
  siteLogo.value = '';
}

function saveToFile() {
  const newContent = `export const linkGroups = ${JSON.stringify(linkGroups, null, 2)};`;
  const blob = new Blob([newContent], { type: 'application/javascript' });
  const filename = 'linkGroups.js';

  if (dlLink.value) {
    if (dlLink.value.href) {
      URL.revokeObjectURL(dlLink.value.href);
    }
    dlLink.value.href = URL.createObjectURL(blob);
    dlLink.value.download = filename;
    dlLink.value.textContent = '下载 ' + filename;
    dlLink.value.style.display = 'block';
    alert('数据已准备就绪，点击下方链接下载最新 JS 文件');
  }
}
</script>

<style scoped>
.add-site-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-home {
  padding: 8px 16px;
  background-color: #646cff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-home:hover {
  background-color: #535bf2;
}

fieldset {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

legend {
  font-weight: bold;
  margin-bottom: 10px;
}

label {
  display: block;
  margin: 10px 0 5px;
}

input, select, button {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.group-list {
  border: 1px solid #ccc;
  margin-top: 20px;
  padding: 10px;
}

pre {
  /* 使用CSS变量适配深色模式 */
  background: var(--pre-background, #f5f5f5);
  color: var(--pre-color, #333);
  padding: 10px;
  overflow-x: auto;
  border-radius: 5px;
  /* 确保内容不居中 */
  text-align: left;
}

button {
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #535bf2;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .add-site-container {
    color: #eee;
  }
  fieldset {
    border-color: #444;
  }
  pre {
    --pre-background: #2d2d2d;
    --pre-color: #eee;
  }
  input, select {
    background-color: #333;
    color: #eee;
    border-color: #555;
  }
  .back-home {
    background-color: #535bf2;
  }
  .back-home:hover {
    background-color: #434af0;
  }
}
</style>