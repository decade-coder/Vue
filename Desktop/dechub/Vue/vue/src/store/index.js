import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    isCollapse: false,
    menuList: [],
  },
  mutations: {
    setUser(state, data) {
      state.userInfo = data;
      localStorage.setItem("userInfo", JSON.stringify(data));
    },
    switchCollapse(state, boolean) {
      state.isCollapse = boolean;
    },
  },
  actions: {},
  modules: {},
});

export default store;
