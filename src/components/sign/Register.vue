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
  <el-row>
    <el-col style="text-align: center;padding-bottom: 20px">
      <el-input style="width: 400px" v-model="regData.username" size="large" placeholder="输入账号"/>
    </el-col>
    <el-col style="text-align: center;padding-bottom: 20px">
      <el-input style="width: 400px" v-model="regData.password" type="password" size="large"
                placeholder="输入密码"/>
    </el-col>
    <el-col style="text-align: center;padding-bottom: 20px">
      <el-button style="text-align: center" @click="register()" type="primary" size="large" plain>注册
      </el-button>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-row {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto 0;
  height: 21px;
}
</style>