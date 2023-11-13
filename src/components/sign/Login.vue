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
        } else {
          loading.close()
        }
      })
}
</script>

<template>
  <el-row>
    <el-col style="text-align: center;padding-bottom: 20px">
      <el-input style="width: 400px" v-model="loginData.username" size="large" placeholder="输入账号"/>
    </el-col>
    <el-col style="text-align: center;padding-bottom: 20px">
      <el-input style="width: 400px" v-model="loginData.password" type="password" size="large"
                placeholder="输入密码"/>
    </el-col>
    <el-col style="text-align: center;padding-bottom: 20px">
      <el-button style="text-align: center" @click="login()" type="primary" size="large" plain>登录
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