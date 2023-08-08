<template>
  <div id="home">
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/logo.jpg" alt="" />
            <div class="user-info">
              <p class="name">Admin</p>
              <p class="access">管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录的时间：<span>2023-01-01</span></p>
            <p>上次登录的地点：<span>武汉市</span></p>
          </div>
        </el-card>
        <el-card class="course-card">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 20px">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card>
          <!-- 折线图 -->
          <div ref="echarts1" style="width: auto; height: 400px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px"></el-card
          ><el-card style="height: 260px"></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import menus from "@/config/menus";
import { MENUS } from "../config/constant";

export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      countData: [
        {
          name: "订单1",
          value: 12345,
          icon: "star-on",
          color: "#2ec7c9",
        },
        {
          name: "订单2",
          value: 12345,
          icon: "star-on",
          color: "#2ec7c9",
        },
        {
          name: "订单3",
          value: 12345,
          icon: "star-on",
          color: "#2ec7c9",
        },
        {
          name: "订单4",
          value: 12345,
          icon: "star-on",
          color: "#2ec7c9",
        },
        {
          name: "订单5",
          value: 12345,
          icon: "star-on",
          color: "#2ec7c9",
        },
        {
          name: "订单6",
          value: 12345,
          icon: "star-on",
          color: "#2ec7c9",
        },
      ],
      newMenus: [],
    };
  },
  created() {
    const menuKeys = JSON.parse(localStorage.getItem(MENUS));
    menus.forEach((item) => {
      if (item.key && menuKeys.includes(item.key)) {
        this.newMenus.push(item);
      }
    });
  },
  mounted() {
    const myChart = echarts.init(this.$refs.echarts1);
    myChart.setOption({
      title: {
        text: "Stacked Line",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid #000;
    margin-right: 40px;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}
.course-card {
  margin-top: 10px;
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 80px;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
