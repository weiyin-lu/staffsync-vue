<script setup>
import {inject, onMounted, ref} from "vue";
// 全局函数
const api = inject("$api")

// 数据列表：部门信息
const basicDeptList = ref({
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
  api.getDeptListByPage(currentPage.value)
      .then(r => {
        basicDeptList.value = r.data.data
      })
}
// 函数：上级部门字段格式化
const deptNameFormat = (row,column,cellValue) => {
  let format = "无";
  for(const obj of basicDeptList.value.records) {
    if(obj.deptCode == cellValue) {
      format = obj.deptName
    }
  }
  return format
}
// 初始化
onMounted(() => {
  // 获得部门信息数据列表第一页
  api.getDeptListByPage(1)
      .then(r => {
        basicDeptList.value = r.data.data
      })
})
</script>

<template>
  <h1>部门信息配置</h1>
  <div style="padding: 10px 0px 10px">
    <el-tag>检索/操作</el-tag>
  </div>
  <el-row gutter="10">
    <el-col :span="20">
      <el-input style="width: 300px" placeholder="部门编码..."/>
      <el-input style="width: 300px" placeholder="部门名称..."/>
      <el-button type="primary" plain>查询</el-button>
    </el-col>
    <el-col :span="4">
      <el-button type="success" plain>添加部门</el-button>
    </el-col>
  </el-row>
  <div style="padding: 10px 0px 10px">
    <el-tag>数据列表</el-tag>
  </div>
  <el-table :data="basicDeptList.records" stripe height="500">
    <el-table-column type="index" label="序号" width="100"/>
    <el-table-column prop="deptCode" label="部门编码"/>
    <el-table-column prop="deptName" label="部门名称"/>
    <el-table-column prop="superior" label="上级部门" :formatter="deptNameFormat"/>
    <el-table-column label="操作">
      <template #default>
        <el-button plain>修改</el-button>
        <el-button type="danger" plain>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="total, ->, prev, pager, next" @current-change="changePage()"
                 :total="basicDeptList.totalRow"
                 v-model:current-page="currentPage"
                 :page-count="basicDeptList.totalPage"/>
</template>

<style scoped>

</style>