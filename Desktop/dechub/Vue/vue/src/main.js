import Vue from "vue";
import moment from "moment";

import router from "./router";
import store from "./store";
import App from "./App.vue";

// 全局样式
import "@/assets/css/index.less";

// elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// mock模拟本地数据
import "@/mock";

// 注册permission
import "./util/permission";

Vue.use(ElementUI);

Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
