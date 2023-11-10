<script setup>

import {inject, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElLoading, ElMessage} from "element-plus";

const api = inject("$api")
const store = useStore()
const router = useRouter()

const loginData = ref({
  username: null,
  password: null
})

const login = () => {
  // 加载条
  const loading = ElLoading.service({
    lock: true,
    text: '登录中...',
  })
  api.login(loginData.value)
      .then(r => {
        if (r) {
          store.dispatch("loginAction", r.data.data)
          // 关闭加载条
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