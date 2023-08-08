// const jwt = require("jsonwebtoken");
const examService = require("../service/exam.service");
// const { UNAUTHORIZATION } = require("../config/error");
// const { PRIVATE_KEY, PUBLIC_KEY } = require("../config/secret");

class ExamController {
  // 查看列表
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await examService.getList(offset, size);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  // 插入数据
  async create(ctx, next) {
    const { body } = ctx.request;
    // 获取发布动态的用户id
    // const { id } = ctx.user;
    // 将动态相关数据保存到数据库中
    // const result = await examService.create(content, id);
    const result = await examService.create(body);
    ctx.body = {
      code: 0,
      message: "新增考试成功！",
      data: result,
    };
  }
  // 更新数据
  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.update(momentId, content);
    ctx.body = {
      code: 0,
      message: "修改成功",
      data: result,
    };
  }
  // 删除数据
  // async remove(ctx, next) {
  //   const { momentId } = ctx.params;
  //   const result = await momentService.remove(momentId);
  //   ctx.body = {
  //     code: 0,
  //     message: "删除成功",
  //     data: result,
  //   };
  // }
}

module.exports = new ExamController();
