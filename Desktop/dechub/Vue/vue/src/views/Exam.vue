<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>考试列表</span>
        <el-button style="margin-left: 10px" type="primary" @click="toAddExam"
          >添加考试</el-button
        >
        <el-button type="danger" style="float: right" @click="delExamItem"
          >批量删除</el-button
        >
      </div>
      <el-table
        v-if="tableData.length"
        :data="tableData"
        style="width: 100%"
        height="600"
        border
        stripe
      >
        <!-- 复选框 -->
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          v-for="item in fields"
          :fixed="item === 'exam_name'"
          :key="item"
          :prop="item"
          :label="examTabel[item].label"
          :width="examTabel[item]?.width || 200"
          :sortable="sortableField.includes(item)"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="item === 'register_date'">
              <div>
                {{
                  scope.row.register_start_date === null
                    ? "---"
                    : $moment(scope.row.register_start_date).format(
                        "YYYY-MM-DD HH:mm"
                      )
                }}
              </div>
              <p>至</p>
              <div>
                {{
                  scope.row.register_end_date === null
                    ? "---"
                    : $moment(scope.row.register_end_date).format(
                        "YYYY-MM-DD HH:mm"
                      )
                }}
              </div>
            </div>
            <div v-else-if="item.includes('date')">
              <template v-if="scope.row[item] === null">
                <p>---</p>
              </template>
              <template v-else>
                <p
                  v-for="item in $moment(scope.row[item])
                    .format('YYYY-MM-DD HH:mm')
                    .split(' ')"
                  :key="item"
                >
                  {{ item }}
                </p>
              </template>
            </div>
            <!-- 笔试内容 -->
            <div v-else-if="item === 'write_content'">
              <p v-for="item in scope.row[item].split(';')" :key="item">
                {{ item }}
              </p>
            </div>
            <!-- 进面条件 -->
            <div v-else-if="item === 'adequate'">
              <div>分数：{{ JSON.parse(scope.row[item]).total }}</div>
              <el-divider></el-divider>
              <div>名次：{{ JSON.parse(scope.row[item]).rank }}</div>
            </div>
            <!-- 最高分情况 -->
            <div v-else-if="item === 'highest'">
              <el-table
                border
                :data="getHighest(scope.row[item])"
                size="mini"
                style="width: 100%"
              >
                <el-table-column
                  prop="name"
                  label="科目"
                  width="134"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="分数"
                  min-width="30"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="总分"
                  min-width="30"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="rank"
                  label="排名"
                  min-width="30"
                >
                </el-table-column>
              </el-table>
            </div>
            <div v-else>
              <div>{{ scope.row[item] }}</div>
            </div>
          </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="delExamItemClick(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else description="描述文字"></el-empty>
    </el-card>
  </div>
</template>

<script>
import { examTabel } from "../config/table";
import { getExamList } from "../api";
export default {
  data() {
    return {
      fields: [
        "exam_name",
        "register_date",
        "register_information",
        "write_date",
        "write_content",
        "write_place",
        "interview_date",
        "interview_content",
        "interview_place",
        "adequate",
        "write_score",
        "write_rank",
        "interview_score",
        "interview_rank",
        "highest",
        "register_expense",
        "else_expense",
        "remark",
      ],
      sortableField: ["register_date", "write_time"],
      examTabel,
      tableData: [],
      test: 123,
    };
  },
  computed: {
    getHighest(str) {
      return function (str) {
        let newArr = [];
        if (str.includes(";")) {
          let highestArr = str.split(";");
          for (const item of highestArr) {
            newArr.push(JSON.parse(item));
          }
        }
        return newArr;
      };
    },
  },
  mounted() {
    // console.log(examTabel);
    this.initM();
  },

  methods: {
    initM() {
      getExamList().then((res) => {
        console.log("getExamList>>>", res);
        this.tableData = res.data;
      });
    },
    delExamItemClick(data) {
      console.log("handleExamItemClick>>>", data);
    },
    toAddExam() {
      this.$router.push("/exam/add");
    },
    delExamItem() {
      console.log("delExamItem");
    },
  },
};
</script>

<style lang="less" scoped></style>
