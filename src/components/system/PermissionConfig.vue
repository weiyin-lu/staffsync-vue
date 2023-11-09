<script setup>
import {inject, onMounted, ref} from "vue";

const api = inject("$api")

const basicPermissionList = ref({
  pageNumber: null,
  pageSize: null,
  records: [],
  totalPage: null,
  totalRow: null
})
const currentPage = ref(1)

const changePage = () => {
  api.getPermissionListByPage(currentPage.value)
      .then(r => {
        basicPermissionList.value = r.data.data
      })
}

onMounted(() => {
  api.getPermissionListByPage(1)
      .then(r => {
        basicPermissionList.value = r.data.data
      })
})
</script>

<template>
  <h1>权限信息配置</h1>
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