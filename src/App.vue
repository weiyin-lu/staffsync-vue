<script setup>
import {onMounted} from 'vue'

// 初始化修改全局主题色
onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#1772b4');
})
</script>

<template>
  <router-view/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
