<template>
  <div id="main">
    <el-container>
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
export default {
  components: { CommonAside, CommonHeader },
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  padding: 0;
}
</style>
