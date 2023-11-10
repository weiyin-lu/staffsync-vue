<script setup>
import {inject, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElLoading, ElMessage} from "element-plus";
// 全局函数
const api = inject("$api")
const store = useStore()
const router = useRouter()
// 请求携带数据：登录信息
const loginData = ref({
  username: null,
  password: null
})
// 函数：登录
const login = () => {
  // loading条
  const loading = ElLoading.service({
    lock: true,
    text: '登录中...',
  })
  // 登录请求
  api.login(loginData.value)
      .then(r => {
        if (r) {
          // 登录信息维护到vuex
          store.dispatch("loginAction", r.data.data)
          // 关闭loading
          loading.close()
          ElMessage.success(r.data.msg)
          router.push("/index")
        }
      })
}
</script>

<template>
  <h2>登录</h2>
  <div>
    <el-input v-model="loginData.username" placeholder="输入账号"/>
    <el-input v-model="loginData.password" type="password" placeholder="输入密码"/>
    <el-button @click="login()" size="large" plain>登录</el-button>
  </div>
</template>

<style scoped>

</style>