<script setup>
import {inject, onMounted, ref} from "vue";
// 全局函数
const api = inject("$api")

// 数据列表：权限信息
const basicPermissionList = ref({
  pageNumber: null,
  pageSize: null,
  records: [],
  totalPage: null,
  totalRow: null
})
// 标识：当前页码
const currentPage = ref(1)
// 函数：翻页
const changePage = () => {
  api.getPermissionListByPage(currentPage.value)
      .then(r => {
        basicPermissionList.value = r.data.data
      })
}
// 初始化
onMounted(() => {
  // 获取权限信息数据列表第一页
  api.getPermissionListByPage(1)
      .then(r => {
        basicPermissionList.value = r.data.data
      })
})
</script>

<template>
  <h1>权限信息配置</h1>
  <div style="padding: 10px 0px 10px">
    <el-tag>检索/操作</el-tag>
  </div>
  <el-row gutter="10">
    <el-col :span="20">
      <el-input style="width: 300px" placeholder="权限标签..."/>
      <el-input style="width: 300px" placeholder="权限名称..."/>
      <el-button type="primary" plain>查询</el-button>
    </el-col>
    <el-col :span="4">
      <el-button type="success" plain>添加权限</el-button>
    </el-col>
  </el-row>
  <div style="padding: 10px 0px 10px">
    <el-tag>数据列表</el-tag>
  </div>
  <el-table :data="basicPermissionList.records" stripe height="500">
    <el-table-column type="index" label="序号" width="100"/>
    <el-table-column prop="permissionId" label="权限编码"/>
    <el-table-column prop="permissionName" label="权限含义"/>
  </el-table>
  <el-pagination background layout="total, ->, prev, pager, next" @current-change="changePage()"
                 :total="basicPermissionList.totalRow"
                 v-model:current-page="currentPage"
                 :page-count="basicPermissionList.totalPage"/>
</template>

<style scoped>

</style>