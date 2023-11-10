<script setup>

import {inject, ref} from "vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const api = inject("$api")
const store = useStore()

const regData = ref({
  username: null,
  password: null
})

const register = () => {
  api.register(regData.value)
      .then(r => {
        if (r) {
          ElMessage.success(r.data.msg)
        }
      })
}
</script>

<template>
  <h2>注册</h2>
  <div>
    <el-input v-model="regData.username" placeholder="输入账号"/>
    <el-input v-model="regData.password" type="password" placeholder="输入密码"/>
    <el-button @click="register()" size="large" plain>注册</el-button>
  </div>
</template>

<style scoped>

</style>