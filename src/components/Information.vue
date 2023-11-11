<script setup>
import {useStore} from "vuex";
import {inject, onMounted, ref} from "vue";
// 全局函数
const api = inject("$api")
const store = useStore()
// 数据列表：账户的角色信息
const currentRoleList = ref([])
// 函数：空值过滤格式化
const notNullFormat = value => {
  if (value == null || value == "") {
    return "无"
  } else {
    return value
  }
}
// 函数：角色信息格式化
const roleFormat = value => {
  for (let item of currentRoleList.value) {
    if (item.roleId == value) {
      return item.roleName
    }
  }
}
// 初始化
onMounted(() => {
  api.getRoleListByUserId(store.state.token.loginId)
      .then(r => {
        if (r) {
          currentRoleList.value = r.data.data;
        }
      })
})
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
      <span v-for="item in store.state.role" style="padding: 0px 5px 0px">
        <el-tag>{{ roleFormat(item) }}</el-tag>
      </span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>

</style>