import Vue from "vue";

import router from "@/router";

Vue.directive("permission", {
  inserted(el, binding) {
    // binding.value表示指令接收的值
    let { action, effect } = binding.value;
    if (!router.currentRoute.meta.includes(action)) {
      // 判断当前路由是否具有action的权限
      if (effect === "disabled") {
        // 当效果为禁用时
        el.disabled = true;
        // element中的类
        el.classList.add("is-disabled");
      } else {
        // 通过父元素移除当前元素
        el.parentNode.removeChild(el);
      }
    }
  },
});
