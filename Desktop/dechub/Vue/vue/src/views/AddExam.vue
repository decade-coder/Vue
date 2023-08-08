<template>
  <div style="height: 100vh">
    <h1>新增考试</h1>
    <el-form
      ref="addExamForm"
      :rules="addExamFormRules"
      :model="addExamFormData"
      label-width="120px"
      height="100%"
    >
      <el-form-item label="考试名称" prop="exam_name">
        <el-input
          v-model="addExamFormData.exam_name"
          :style="`width: ${formWidth}px`"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="报考时间" prop="register_date">
        <el-col>
          <el-date-picker
            v-model="addExamFormData.register_date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="报考信息">
        <el-input
          type="textarea"
          v-model="addExamFormData.register_information"
          :style="`width: ${formWidth}px`"
        ></el-input>
      </el-form-item>
      <el-form-item label="笔试时间">
        <el-date-picker
          v-model="addExamFormData.write_date"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm"
          placeholder="选择笔试时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="笔试内容">
        <el-checkbox-group v-model="addExamFormData.write_content">
          <el-checkbox label="职业能力倾向测验" name="type"></el-checkbox>
          <el-checkbox label="综合应用能力" name="type"></el-checkbox>
          <el-checkbox label="公共基础知识" name="type"></el-checkbox>
          <el-checkbox label="行政职业能力测验" name="type"></el-checkbox>
          <el-checkbox label="申论" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="笔试地点">
        <el-input
          type="textarea"
          v-model="addExamFormData.write_place"
          :style="`width: ${formWidth}px`"
        ></el-input>
      </el-form-item>
      <el-form-item label="面试时间">
        <el-date-picker
          v-model="addExamFormData.interview_date"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm"
          placeholder="选择面试时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="面试内容">
        <el-input
          type="textarea"
          v-model="addExamFormData.interview_content"
          :style="`width: ${formWidth}px`"
        ></el-input>
      </el-form-item>
      <el-form-item label="面试地点">
        <el-input
          type="textarea"
          v-model="addExamFormData.interview_place"
          :style="`width: ${formWidth}px`"
        ></el-input>
      </el-form-item>
      <el-form-item class="highest-area" label="单科最高分">
        <el-form-item
          v-for="(item, index) in addExamFormData.highest"
          :key="item.key"
          :prop="'highest.' + index"
          style="margin-bottom: 10px"
        >
          <el-input v-model="item.name" placeholder="科目名称"></el-input>
          <el-input v-model="item.score" placeholder="单科最高分"></el-input>
          <el-input v-model="item.total" placeholder="最高分者总分"></el-input>
          <el-input
            v-model="item.rank"
            placeholder="最高分者总分排名"
          ></el-input>
          <el-button
            type="danger"
            icon="el-icon-remove-outline"
            @click.prevent="removeHighestItem(item)"
            >删除</el-button
          >
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addHighestItem"
          >添加科目</el-button
        >
      </el-form-item>
      <el-form-item class="pass-write" label="进面条件">
        <el-input
          v-model="addExamFormData.adequate.total"
          placeholder="总分"
          clearable
        ></el-input>
        <el-input
          v-model="addExamFormData.adequate.rank"
          placeholder="排名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item class="write-result" label="笔试结果">
        <el-input
          v-model="addExamFormData.write_score"
          placeholder="分数"
          clearable
        ></el-input>
        <el-input
          v-model="addExamFormData.write_rank"
          placeholder="排名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item class="interview-result" label="面试结果">
        <el-input
          v-model="addExamFormData.interview_score"
          placeholder="分数"
          clearable
        ></el-input>
        <el-input
          v-model="addExamFormData.interview_rank"
          placeholder="排名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item class="expense" label="报名费/其他">
        <el-input
          v-model="addExamFormData.register_expense"
          placeholder="报名费"
          clearable
        ></el-input>
        <el-input
          v-model="addExamFormData.else_expense"
          placeholder="其他费用"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" :style="`width: ${formWidth}px`">
        <el-input type="textarea" v-model="addExamFormData.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addExamItem } from "../api";
import { addExamFormRules } from "../config/form-rules";
export default {
  data() {
    return {
      formWidth: 700,
      addExamFormData: {
        exam_name: "",
        register_information: "",
        write_content: ["职业能力倾向测验", "综合应用能力"],
        write_place: "",
        interview_content: "",
        interview_place: "",
        highest: [],
        adequate: {
          total: "",
          rank: "",
        },
        write_score: "",
        write_rank: "",
        register_expense: "",
        else_expense: "",
        remark: "",
        register_date: "",
        write_date: "",
        interview_date: "",
      },
      addExamFormRules,
    };
  },
  mounted() {},
  methods: {
    addHighestItem() {
      this.addExamFormData.highest.push({
        score: null,
        total: null,
        rank: null,
        key: Date.now(),
      });
    },
    removeHighestItem(item) {
      var index = this.addExamFormData.highest.indexOf(item);
      if (index !== -1) {
        this.addExamFormData.highest.splice(index, 1);
      }
    },
    onSubmit() {
      const addExamItemParams = { ...this.addExamFormData };
      addExamItemParams.register_start_date =
        addExamItemParams.register_date[0];
      addExamItemParams.register_end_date = addExamItemParams.register_date[1];
      let highestArr = [];
      console.log("addExamItemParams>>>", addExamItemParams);
      for (const highestItem of addExamItemParams.highest) {
        highestArr.push(JSON.stringify(highestItem));
      }
      addExamItemParams.highest = highestArr.join(";");
      addExamItemParams.adequate = JSON.stringify(addExamItemParams.adequate);
      addExamItemParams.write_content =
        addExamItemParams.write_content.join(";");
      addExamItem(addExamItemParams).then((res) => {
        console.log("addExamItem>>>", res);
        this.$message({
          message: "新增考试成功！",
          type: "success",
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.highest-area .el-input,
.pass-write .el-input,
.write-result .el-input,
.interview-result .el-input,
.expense .el-input {
  width: 146px;
  margin-right: 10px;
}
.el-form {
  padding-bottom: 30px;
}
</style>
../api/module../api/module
