<script setup>
import {inject, onMounted, ref} from 'vue'
import {useStore} from "vuex";

const api = inject('$api')

const isLogin = ref({})

onMounted(() => {
  api.isLogin().then(r => {
    console.log(r.data)
    isLogin.value = r.data
  })
})

</script>

<template>
{{ isLogin }}
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
