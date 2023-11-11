<script setup>
import {useStore} from "vuex";
// 全局函数
const store = useStore()
// 函数：空值过滤格式化
const notNullFormat = value => {
  if (value == null || value == "") {
    return "无"
  } else {
    return value
  }
}
</script>

<template>
  <h1>个人信息</h1>
  <el-descriptions border direction="vertical" :column="2">
    <template #extra>
      <el-button type="primary" plain>维护个人信息</el-button>
    </template>
    <el-descriptions-item label="账号">{{ store.state.info.userId }}</el-descriptions-item>
    <el-descriptions-item label="姓名">{{ store.state.info.name }}</el-descriptions-item>
    <el-descriptions-item label="联系方式">{{ notNullFormat(store.state.info.phone) }}</el-descriptions-item>
    <el-descriptions-item label="联系方式">{{ notNullFormat(store.state.info.email) }}</el-descriptions-item>
    <el-descriptions-item label="部门">{{ notNullFormat(store.state.info.department) }}</el-descriptions-item>
    <el-descriptions-item label="岗位">{{ notNullFormat(store.state.info.post) }}</el-descriptions-item>
    <el-descriptions-item label="角色">
      <div>
        <el-tag v-for="item in store.state.role">{{ item }}</el-tag>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>

</style>