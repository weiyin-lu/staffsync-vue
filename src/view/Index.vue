<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal">
        <h1>StaffSync人事管理系统</h1>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
            default-active="/index"
            router>
          <el-sub-menu>
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item index="system-deptConfig">部门信息配置</el-menu-item>
            <el-menu-item index="system-roleConfig">角色信息配置</el-menu-item>
            <el-menu-item index="system-permissionConfig">权限信息配置</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              权限管理
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">用户角色配置</el-menu-item>
              <el-menu-item index="1-2">角色和权限组配置</el-menu-item>
            </el-menu-item-group>
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
</template>

<style scoped>
.el-container {
  min-height: 100vh;
}

.el-footer {
  text-align: center;
  font-size: 15px;
  color: darkgray;
}
</style>