<script setup>
import {inject, onMounted, ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
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
// 请求数据：修改角色信息
const roleEditData = ref({
  roleId: null,
  roleName: null
})
// 请求数据：添加角色信息
const roleAddData = ref({
  roleId: null,
  roleName: null
})
// 标识：当前页码
const currentPage = ref(1)
// 标识：修改对话框显示
const editDialogVisible = ref(false)
// 标识：添加对话框显示
const addDialogVisible = ref(false)
// 标识：配置权限组对话框显示
const permissionDialogVisible = ref(false)
// 标识：配置菜单对话框显示
const menuDialogVisible = ref(false)
// 函数：修改角色信息 数据装填
const setRoleBefore = value => {
  editDialogVisible.value = true
  roleEditData.value.roleId = value.roleId
  roleEditData.value.roleName = value.roleName
}
// 函数：添加角色
const addRole = () => {
  api.addRole(roleAddData.value)
      .then(r => {
        if (r) {
          ElMessage.success(r.data.msg)
          addDialogVisible.value = false
          getNowPage()
        }
      })
}
// 函数：修改角色信息
const setRole = () => {
  api.setRoleByRoleId(roleEditData.value)
      .then(r => {
        if (r) {
          ElMessage.success(r.data.msg)
          // 关闭菜单、清空请求数据、重新获取当前列表
          editDialogVisible.value = false
          Object.keys(roleEditData.value).forEach((i) => roleEditData.value[i] = null)
          getNowPage()
        }
      })
}
// 函数：删除角色信息
const removeRole = (value) => {
  api.removeRoleByRoleId(value)
      .then(r => {
        if (r) {
          ElMessage.success(r.data.msg)
          getNowPage()
        }
      })
}
// 函数：获取当前页的数据
const getNowPage = () => {
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
  <!--  检索/操作区域-->
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
      <el-button type="success" plain @click="addDialogVisible=true">添加角色</el-button>
    </el-col>
  </el-row>
  <!--  数据列表区域-->
  <div style="padding: 10px 0px 10px">
    <el-tag>数据列表</el-tag>
  </div>
  <el-table :data="basicRoleList.records" stripe height="500">
    <el-table-column type="index" label="序号" width="100"/>
    <el-table-column prop="roleId" label="角色编码"/>
    <el-table-column prop="roleName" label="角色含义"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" plain>配置权限组</el-button>
        <el-button type="primary" plain>配置菜单</el-button>
        <el-popover placement="left">
          <template #reference>
            <el-button plain circle>
              <el-icon color="#222222">
                <More/>
              </el-icon>
            </el-button>
          </template>
          <el-text>操作：</el-text>
          <el-button type="warning" plain circle @click="setRoleBefore(scope.row)">
            <el-icon color="#222222">
              <Edit/>
            </el-icon>
          </el-button>
          <el-popconfirm title="确定删除？" @confirm="removeRole(scope.row.roleId)" hide-after="100">
            <template #reference>
              <el-button type="danger" plain circle>
                <el-icon color="#222222">
                  <Delete/>
                </el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
  <!--  分页区-->
  <el-pagination background layout="total, ->, prev, pager, next" @current-change="changePage()"
                 :total="basicRoleList.totalRow"
                 v-model:current-page="currentPage"
                 :page-count="basicRoleList.totalPage"/>
  <!--  修改对话框-->
  <el-dialog v-model="editDialogVisible" width="300px">
    <template #title>
      <h1>修改角色信息</h1>
    </template>
    <el-row>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 200px" size="large" v-model="roleEditData.roleId" disabled/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 20px">
        <el-input style="width: 200px" size="large" placeholder="角色含义（名称）"
                  v-model="roleEditData.roleName"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-button type="success" size="large" plain @click="setRole()">提交修改</el-button>
      </el-col>
    </el-row>
  </el-dialog>
  <!--  添加对话框-->
  <el-dialog v-model="addDialogVisible" width="300px">
    <template #title>
      <h1>添加角色</h1>
    </template>
    <el-row>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 200px" size="large" placeholder="角色id" v-model="roleAddData.roleId"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 20px">
        <el-input style="width: 200px" size="large" placeholder="角色含义（名称）"
                  v-model="roleAddData.roleName"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-button type="success" size="large" plain @click="addRole()">提交修改</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style scoped>

</style>