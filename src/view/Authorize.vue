<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
// 全局变量
const router = useRouter()
// 标识：登录注册按钮切换
const check = ref("登录")
// 函数：切换登录注册页面
const checkPage = () => {
  switch (check.value) {
    case "登录":
      router.push("/sign/login");
      break;
    case "注册":
      router.push("/sign/register");
      break;
    default:
      router.push("/sign/login");
      break;
  }
}
</script>

<template>
  <el-row>
    <el-col :span="8" :offset="8">
      <el-space direction="vertical" size="large">
        <el-text type="primary">StaffSync人事管理系统</el-text>
        <el-radio-group v-model="check" size="large" @change="checkPage()">
          <el-radio-button label="登录"/>
          <el-radio-button label="注册"/>
        </el-radio-group>
        <el-card>
          <router-view/>
        </el-card>
      </el-space>
    </el-col>
  </el-row>
</template>

<style scoped>

.el-text {
  font-size: 45px;
}

.el-card {
  width: 500px;
  height: 300px;
  margin: 0 auto;
}
</style>