<script setup>
import {inject, onMounted, ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
// 全局函数
const api = inject("$api")
// 数据列表：角色信息
const basicRoleList = ref({
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
  api.getRoleListByPage(currentPage.value)
      .then(r => {
        basicRoleList.value = r.data.data
      })
}
// 初始化
onMounted(() => {
  // 获取角色信息数据列表第一页
  api.getRoleListByPage(1)
      .then(r => {
        basicRoleList.value = r.data.data
      })
})
</script>

<template>
  <h1>角色信息配置</h1>
  <div style="padding: 10px 0px 10px">
    <el-tag>检索/操作</el-tag>
  </div>
  <el-row gutter="10">
    <el-col :span="20">
      <el-input style="width: 300px" placeholder="角色编码..."/>
      <el-input style="width: 300px" placeholder="角色名称..."/>
      <el-button type="primary" plain>查询</el-button>
    </el-col>
    <el-col :span="4">
      <el-button type="success" plain>添加权限</el-button>
    </el-col>
  </el-row>
  <div style="padding: 10px 0px 10px">
    <el-tag>数据列表</el-tag>
  </div>
  <el-table :data="basicRoleList.records" stripe height="500">
    <el-table-column type="index" label="序号" width="100"/>
    <el-table-column prop="roleId" label="角色编码"/>
    <el-table-column prop="roleName" label="角色含义"/>
    <el-table-column label="操作">
      <template #default>
        <el-button type="primary" plain>配置权限组</el-button>
        <el-button type="primary" plain>配置菜单</el-button>
        <el-popover placement="left">
          <el-text>操作：</el-text>
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
          <template #reference>
            <el-button plain circle>
              <el-icon color="#222222">
                <More/>
              </el-icon>
            </el-button>
          </template>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="total, ->, prev, pager, next" @current-change="changePage()"
                 :total="basicRoleList.totalRow"
                 v-model:current-page="currentPage"
                 :page-count="basicRoleList.totalPage"/>
</template>

<style scoped>

</style>