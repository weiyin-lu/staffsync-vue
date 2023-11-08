<script setup>

import {inject, ref} from "vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const api = inject("$api")
const store = useStore()

const loginData = ref({
  username: null,
  password: null
})

const login = () => {
  api.login(loginData.value)
      .then(r => {
        if (r) {
          store.dispatch("loginAction", r.data.data)
          ElMessage.success(r.data.msg)
        }
      })
}
</script>

<template>
  <h2>登录</h2>
  <div>
    <el-input v-model="loginData.username" placeholder="输入账号"/>
    <el-input v-model="loginData.password" placeholder="输入密码"/>
    <el-button @click="login()" size="large" plain>登录</el-button>
  </div>
</template>

<style scoped>

</style>