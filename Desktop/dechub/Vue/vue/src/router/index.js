import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

Vue.use(VueRouter);

const ruleMapping = {
  user: {
    path: "/user",
    component: () => import("@/views/User.vue"),
  },
  exam: {
    path: "/exam",
    component: () => import("@/views/Exam.vue"),
  },
};

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/login", component: () => import("@/views/Login.vue") },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    children: [
      { path: "/mall", component: () => import("../views/Mall.vue") },
      { path: "/test", component: () => import("../views/Test.vue") },
    ],
  },
  { path: "*", component: () => import("../views/NotFound.vue") },
];

// 插入动态路由
export function initDynamicRoutes() {
  const currentRoutes = router.options.routes;
  const rightList = store.rightList;
  rightList.forEach((item) => {
    item.children.forEach((subItem) => {
      const temp = ruleMapping[subItem.path];
      currentRoutes[2].children.push(temp);
    });
  });
}

const router = new VueRouter({
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    const token = sessionStorage.getItem("token");
    if (!token) {
      next("/login");
    } else {
      next();
    }
  }
});

// 解决 重复点击路由出现的控制台报错 禁止全局的路由错误处理
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

export default router;
