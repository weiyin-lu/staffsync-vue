<script setup>
import {inject, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
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
// 请求数据：修改菜单信息
const menuEditData = ref({
  menuId: null,
  url: null,
  componentPath: null,
  description: null
})
// 请求数据：添加菜单信息
const menuAddData = ref({
  menuId: null,
  url: null,
  componentPath: null,
  description: null
})
// 标识：当前页码
const currentPage = ref(1)
// 标识：修改对话框显示
const editDialogVisible = ref(false)
// 标识：添加对话框显示
const addDialogVisible = ref(false)
// 函数：修改菜单信息 数据装填
const setMenuBefore = value => {
  editDialogVisible.value = true
  menuEditData.value.menuId = value.menuId
  menuEditData.value.url = value.url
  menuEditData.value.componentPath = value.componentPath
  menuEditData.value.description = value.description
}
// 函数：修改角色信息
const setMenu = () => {
  api.setMenuByMenuId(menuEditData.value)
      .then(r => {
        if (r) {
          ElMessage.success(r.data.msg)
          // 关闭菜单、清空请求数据、重新获取当前列表
          editDialogVisible.value = false
          Object.keys(menuEditData.value).forEach((i) => menuEditData.value[i] = null)
          getNowPage()
        }
      })
}
// 函数：添加菜单信息
const addMenu = () => {
  api.addMenu(menuAddData.value)
      .then(r => {
        if (r) {
          ElMessage.success(r.data.msg)
          addDialogVisible.value = false
          getNowPage()
        }
      })
}
// 函数：删除菜单信息
const removeMenu = (value) => {
  api.removeMenuByMenuId(value)
      .then(r => {
        if (r) {
          ElMessage.success(r.data.msg)
          getNowPage()
        }
      })
}
// 函数：获取当前页的数据
const getNowPage = () => {
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
  <!--  操作区-->
  <div style="padding: 10px 0px 10px">
    <el-tag>检索/操作</el-tag>
  </div>
  <el-row gutter="10">
    <el-col :span="20">
      <el-input style="width: 300px" placeholder="菜单编码..."/>
      <el-button type="primary" plain>查询</el-button>
    </el-col>
    <el-col :span="4">
      <el-button type="success" plain @click="addDialogVisible=true">配置新菜单</el-button>
    </el-col>
  </el-row>
  <!--  数据显示区-->
  <div style="padding: 10px 0px 10px">
    <el-tag>数据列表</el-tag>
  </div>
  <el-table :data="basicMenuList.records" stripe height="550">
    <el-table-column type="index" label="序号" width="100"/>
    <el-table-column prop="menuId" label="菜单编码"/>
    <el-table-column prop="description" label="菜单描述"/>
    <el-table-column prop="url" label="部门名称"/>
    <el-table-column prop="componentPath" label="组件路径"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="warning" plain circle @click="setMenuBefore(scope.row)">
          <el-icon color="#222222">
            <Edit/>
          </el-icon>
        </el-button>
        <el-popconfirm title="确定删除？" @confirm="removeMenu(scope.row.menuId)" hide-after="100">
          <template #reference>
            <el-button type="danger" plain circle>
              <el-icon color="#222222">
                <Delete/>
              </el-icon>
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!--  分页区-->
  <el-pagination background layout="total, ->, prev, pager, next" @current-change="getNowPage()"
                 :total="basicMenuList.totalRow"
                 v-model:current-page="currentPage"
                 :page-count="basicMenuList.totalPage"/>
  <!--  修改对话框-->
  <el-dialog v-model="editDialogVisible" width="500px">
    <template #title>
      <h1>修改菜单信息</h1>
    </template>
    <el-row>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" v-model="menuEditData.menuId" disabled/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" placeholder="访问路径"
                  v-model="menuEditData.url"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" placeholder="组件路径"
                  v-model="menuEditData.componentPath"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 20px">
        <el-input style="width: 300px" size="large" placeholder="组件描述"
                  v-model="menuEditData.description"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-button type="success" size="large" plain @click="setMenu()">提交修改</el-button>
      </el-col>
    </el-row>
  </el-dialog>
  <!--  添加对话框-->
  <el-dialog v-model="addDialogVisible" width="500px">
    <template #title>
      <h1>配置新菜单</h1>
    </template>
    <el-row>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" placeholder="菜单ID" v-model="menuAddData.menuId"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" placeholder="访问路径"
                  v-model="menuAddData.url"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" placeholder="组件路径"
                  v-model="menuAddData.componentPath"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 20px">
        <el-input style="width: 300px" size="large" placeholder="组件描述"
                  v-model="menuAddData.description"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-button type="success" size="large" plain @click="addMenu()">添加</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style scoped>

</style>