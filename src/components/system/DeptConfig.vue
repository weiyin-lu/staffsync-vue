<script setup>
import {inject, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
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
// 数据列表：部门信息（树形嵌套列表）
const treeDeptList = ref([])
// 请求数据：部门信息
const deptAddData = ref({
  deptCode: null,
  deptName: null,
  superior: null
})
// 标识：级联选择器选择的路径数组
const cascaderPath = ref([])
// 标识：级联选择器配置
const cascaderConfig = ref({
  checkStrictly: true,
  value: "deptCode",
  label: "deptName",
  children: "childList"
})
// 标识：添加对话框显示
const addDialogVisible = ref(false)
// 标识：当前页码
const currentPage = ref(1)
// 函数：添加部门
const addDept = () => {
  // 将级联选择器选择的最末级路径装填到请求数据中
  deptAddData.value.superior = cascaderPath.value[cascaderPath.value.length - 1]
  api.addDept(deptAddData.value)
      .then(r=>{
        if(r) {
          ElMessage.success(r.data.msg)
          addDialogVisible.value = false
          getNowPage()
        }
      })
}
// 函数：获取当前页的数据
const getNowPage = () => {
  api.getDeptListByPage(currentPage.value)
      .then(r => {
        basicDeptList.value = r.data.data
      })
}
// 初始化
onMounted(() => {
  // 获得部门信息数据列表第一页
  api.getDeptListByPage(1)
      .then(r => {
        basicDeptList.value = r.data.data
      })
  // 装填所有部门信息嵌套数据列表
  api.getDeptListForTree('ZCB')
      .then(r => {
        treeDeptList.value = r.data.data
      })
})
</script>

<template>
  <h1>部门信息配置</h1>
  <!--  操作区-->
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
      <el-button type="success" plain @click="addDialogVisible=true">添加部门</el-button>
    </el-col>
  </el-row>
  <!--  数据展示区-->
  <div style="padding: 10px 0px 10px">
    <el-tag>数据列表</el-tag>
  </div>
  <el-table :data="basicDeptList.records" stripe height="550">
    <el-table-column type="index" label="序号" width="100"/>
    <el-table-column prop="deptCode" label="部门编码"/>
    <el-table-column prop="deptName" label="部门名称"/>
    <el-table-column prop="superior" label="上级部门"/>
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
  <!--  分页区-->
  <el-pagination background layout="total, ->, prev, pager, next" @current-change="getNowPage()"
                 :total="basicDeptList.totalRow"
                 v-model:current-page="currentPage"
                 :page-count="basicDeptList.totalPage"/>
  <!--  添加对话框-->
  <el-dialog v-model="addDialogVisible" width="500px">
    <template #title>
      <h1>添加部门</h1>
    </template>
    <el-row>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" placeholder="部门编码"
                  v-model="deptAddData.deptCode"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" placeholder="部门名称"
                  v-model="deptAddData.deptName"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 20px">
        <el-text>上级部门：</el-text>
        <el-cascader v-model="cascaderPath" :options="treeDeptList" :props="cascaderConfig"
                     clearable/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-button type="success" size="large" plain @click="addDept()">添加</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style scoped>

</style>