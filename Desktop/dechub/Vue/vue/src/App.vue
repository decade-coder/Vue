<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { initDynamicRoutes } from "@/router";
export default {
  name: "App",
  components: {},
  created() {
    // 解决页面刷新动态路由丢失问题
    initDynamicRoutes();
  },
};
</script>

<style lang="less" scoped></style>
