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
// 请求数据：查询部门信息
const searchData = ref({
  deptCode: null,
  deptName: null,
  page: 1
})
// 请求数据：添加部门信息
const deptAddData = ref({
  deptCode: null,
  deptName: null,
  superior: null
})
// 请求数据：修改部门信息
const deptEditData = ref({
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
// 标识：修改对话框显示
const EditDialogVisible = ref(false)
// 标识：当前页码
const currentPage = ref(1)
// 函数：数据模糊匹配查询部门
const searchDeptList = () => {
  searchData.value.page = currentPage.value
  api.getDeptListByCondition(searchData.value)
      .then(r => {
        console.log(basicDeptList.value)
        basicDeptList.value = r.data.data
      })
}
// 函数：获取当前页的数据
const getNowPage = () => {
  // 如果查询输入框有值，就通过模糊匹配函数获取数据；如果没有，就通过正常函数查询
  if ((searchData.value.deptCode == null || searchData.value.deptCode == "") &&
      (searchData.value.deptName == null || searchData.value.deptName == "")) {
    api.getDeptListByPage(currentPage.value)
        .then(r => {
          basicDeptList.value = r.data.data
        })
  } else {
    searchDeptList()
  }
}
// 函数：添加部门
const addDept = () => {
  // 将级联选择器选择的最末级路径装填到请求数据中
  deptAddData.value.superior = cascaderPath.value[cascaderPath.value.length - 1]
  api.addDept(deptAddData.value)
      .then(r => {
        if (r) {
          addDialogVisible.value = false
          Object.keys(deptAddData.value).forEach((i) => deptAddData.value[i] = null)
          ElMessage.success(r.data.msg)
          getNowPage()
        }
      })
}
// 函数：删除部门
const removeDept = value => {
  api.removeDeptByDeptCode(value)
      .then(r => {
        if (r) {
          ElMessage.success(r.data.msg)
          getNowPage()
        }
      })
}
// 函数：修改部门 数据装填
const setDeptBefore = (value) => {
  EditDialogVisible.value = true
  deptEditData.value.deptCode = value.deptCode
  deptEditData.value.deptName = value.deptName
}
// 函数：修改部门
const setDept = () => {
  // 将级联选择器选择的最末级路径装填到请求数据中
  deptEditData.value.superior = cascaderPath.value[cascaderPath.value.length - 1]
  api.setDeptByCode(deptEditData.value)
      .then(r => {
        if (r) {
          addDialogVisible.value = false
          Object.keys(deptEditData.value).forEach((i) => deptEditData.value[i] = null)
          ElMessage.success(r.data.msg)
          getNowPage()
        }
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
      <el-input style="width: 300px" placeholder="部门编码..." v-model="searchData.deptCode"
                @input="searchDeptList()"/>
      <el-input style="width: 300px" placeholder="部门名称..." v-model="searchData.deptName"
                @input="searchDeptList()"/>
      <el-button type="primary" plain @click="searchDeptList">查询</el-button>
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
    <el-table-column prop="superiorName" label="上级部门"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="warning" plain circle @click="setDeptBefore(scope.row)">
          <el-icon color="#222222">
            <Edit/>
          </el-icon>
        </el-button>
        <el-popconfirm title="删除部门可能会导致员工失去部门信息，确定删除？"
                       @confirm="removeDept(scope.row.deptCode)"
                       hide-after="100">
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
  <!--  修改对话框-->
  <el-dialog v-model="EditDialogVisible" width="500px">
    <template #title>
      <h1>修改部门信息</h1>
    </template>
    <el-row>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" placeholder="部门编码"
                  v-model="deptEditData.deptCode" disabled/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-input style="width: 300px" size="large" placeholder="部门名称"
                  v-model="deptEditData.deptName"/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 20px">
        <el-text>上级部门：</el-text>
        <el-cascader v-model="cascaderPath" :options="treeDeptList" :props="cascaderConfig"
                     :placeholder="deptEditData.superior" clearable/>
      </el-col>
      <el-col style="text-align: center;padding-bottom: 5px">
        <el-button type="success" size="large" plain @click="addDept()">添加</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style scoped>

</style>