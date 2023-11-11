<script setup>
import {useRouter} from "vue-router";
import {inject, ref} from "vue";
import {ElMessage} from "element-plus";
// 全局函数
const api = inject("$api")
const router = useRouter()
// 标识：注销对话框
const logoutDialogVisible = ref(false)
// 函数：账号注销
const logout = () => {
  api.logout()
      .then(r => {
        if (r) {
          ElMessage.info(r.data.msg + '...');
          router.push("/sign/login")
        }
      })
}
</script>

<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" :ellipsis="false" background-color="#1772b4" text-color="white"
               active-text-color="white" router>
        <el-menu-item index="/index/default"><h1>StaffSync人事管理系统</h1></el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item @click="logoutDialogVisible = true">注销</el-menu-item>
      </el-menu>

    </el-header>
    <el-container>
      <el-aside>
        <el-menu default-active="/index" background-color="#1772c5" text-color="#FFFFFF"
                 active-text-color="#AAAAFF" router>
          <el-sub-menu>
            <template #title>
              <span>系统配置管理</span>
            </template>
            <el-menu-item index="system-roleConfig">角色信息配置</el-menu-item>
            <el-menu-item index="system-menuConfig">菜单信息配置</el-menu-item>
            <el-menu-item index="system-permissionConfig">权限信息配置</el-menu-item>
            <el-menu-item index="system-deptConfig">部门信息配置</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>

    <el-footer height="30px">
      weiyin.online copyright &copy; 2023
    </el-footer>

  </el-container>

  <el-dialog v-model="logoutDialogVisible" width="300px">
    <template #title>
      <h3>登出</h3>
    </template>
    确认登出？
    <template #footer>
      <el-button type="success" @click="logout()" plain>确定</el-button>
      <el-button type="danger" @click="logoutDialogVisible = false" plain>取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-container {
  min-height: 92vh;
}

.el-footer {
  text-align: center;
  font-size: 15px;
  color: darkgray;
}
.flex-grow {
  flex-grow: 1;
}
.el-header {
  background-color: #1772b4;
}
.el-aside {
  height: 91vh;
  background-color: #1772c5;
}
</style>