export default {
  state: {
    isCollapse: false, //控制菜单的展开/折叠
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/home",
      },
    ],
  },
  mutations: {
    // 修改菜单栏展开/收起
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 更新面包屑数据
    selectMenu(state, val) {
      // 判断添加的数据是否为首页
      if (val.name !== "home") {
        const index = state.tabList.findIndex((item) => item.name === val.name);
        // 如果不存在
        if (index === -1) {
          state.tabList.push(val);
        }
      }
    },
  },
};
