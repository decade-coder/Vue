<template>
  <div id="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ACCESS_TOKEN, ROLE, MENUS } from "../config/constant";
import { login } from "../api/user";
import Exam from "../views/Exam.vue";

export default {
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
      login(this.form).then((res) => {
        let { accessToken, role, menus } = res.data;
        console.log(1);
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(ROLE, role);
        localStorage.setItem(MENUS, JSON.stringify(menus));
        if (role === "admin") {
          this.router.addRoute("exam", Exam);
        }
        this.router.push("/home");
      });
    },
  },
};
</script>

<style></style>
