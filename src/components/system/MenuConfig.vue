<script setup>
import {inject, onMounted, ref} from "vue";
// 全局函数
const api = inject("$api")

// 数据列表：菜单信息
const basicMenuList = ref({
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
  api.getMenuListByPage(currentPage.value)
      .then(r => {
        basicMenuList.value = r.data.data
      })
}
// 初始化
onMounted(() => {
  // 获得部门信息数据列表第一页
  api.getMenuListByPage(1)
      .then(r => {
        basicMenuList.value = r.data.data
      })
})
</script>

<template>
  <h1>菜单信息配置</h1>
  <div style="padding: 10px 0px 10px">
    <el-tag>检索/操作</el-tag>
  </div>
  <el-row gutter="10">
    <el-col :span="20">
      <el-input style="width: 300px" placeholder="菜单编码..."/>
      <el-button type="primary" plain>查询</el-button>
    </el-col>
    <el-col :span="4">
      <el-button type="success" plain>增加菜单配置</el-button>
    </el-col>
  </el-row>
  <div style="padding: 10px 0px 10px">
    <el-tag>数据列表</el-tag>
  </div>
  <el-table :data="basicMenuList.records" stripe height="500">
    <el-table-column type="index" label="序号" width="100"/>
    <el-table-column prop="menuId" label="菜单编码"/>
    <el-table-column prop="description" label="菜单描述"/>
    <el-table-column prop="url" label="部门名称"/>
    <el-table-column prop="componentPath" label="组件路径"/>
    <el-table-column label="操作">
      <template #default>
        <el-button type="warning" plain circle>
          <el-icon color="#222222">
            <Edit/>
          </el-icon>
        </el-button>
        <el-button type="danger" plain circle>
          <el-icon color="#222222">
            <Delete/>
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="total, ->, prev, pager, next" @current-change="changePage()"
                 :total="basicMenuList.totalRow"
                 v-model:current-page="currentPage"
                 :page-count="basicMenuList.totalPage"/>
</template>

<style scoped>

</style>