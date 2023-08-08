export const addExamFormRules = {
  exam_name: [{ required: true, message: "请选择考试名称", trigger: "blur" }],
  register_date: [
    { required: true, message: "请选择报考日期", trigger: "blur" },
  ],
};
