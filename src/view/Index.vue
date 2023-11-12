<script setup>
import {useRouter} from "vue-router";
import {inject, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";
// 全局函数
const api = inject("$api")
const router = useRouter()
const store = useStore()
// 标识：注销对话框
const logoutDialogVisible = ref(false)
// 标识：菜单显示控制
const menuVisible = ref({
  system: false,
  roleConfig: false,
  menuConfig: false,
  permissionConfig: false,
  deptConfig: false
})
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
onMounted(() => {
  // 从后台获取数据判断菜单是否应该显示
  api.getMenuListByUserId(store.state.token.loginId)
      .then(r => {
        // 正则表达式组
        const all = /^all$/
        const system = /^system/
        // 遍历请求得到的菜单列表，通过正则表达式进行权限判断
        for (let menu of r.data.data) {
          // 1.如果菜单列表中有all，把所有菜单设置为true
          if (all.test(menu.menuId)) {
            Object.keys(menuVisible.value).forEach((i) => menuVisible.value[i] = true)
            return
          }
          // 2.如果有system菜单相关的菜单权限，把system分类设置为true
          if (system.test(menu.menuId)) {
            menuVisible.value.system = true
          }
          // 常规处理：把菜单id对应的菜单权限显示出来
          let index = menu.menuId.indexOf("-") + 1
          let flag = menu.menuId.substring(index)
          menuVisible.value[flag] = true;
        }
      })
})
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
          <el-sub-menu v-if="menuVisible.system">
            <template #title>
              <span>系统配置管理</span>
            </template>
            <el-menu-item v-if="menuVisible.roleConfig" index="system-roleConfig">角色信息配置</el-menu-item>
            <el-menu-item v-if="menuVisible.menuConfig" index="system-menuConfig">菜单信息配置</el-menu-item>
            <el-menu-item v-if="menuVisible.permissionConfig" index="system-permissionConfig">权限信息配置
            </el-menu-item>
            <el-menu-item v-if="menuVisible.deptConfig" index="system-deptConfig">部门信息配置</el-menu-item>
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