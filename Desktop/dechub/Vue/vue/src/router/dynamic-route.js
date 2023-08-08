//动态路由
const exam = {
  path: "/exam",
  name: "exam",
  component: () => import(/* webpackChunkName:"exam" */ "@/views/Exam.vue"),
};

export default exam;
