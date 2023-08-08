const koaRouter = require("@koa/router");
const examRouter = new koaRouter({ prefix: "/api/exam" });
const { list, create } = require("../controller/exam.controller");
// const { verifyAuth } = require("../middleware/login.middleware");
// const { verifyPermission } = require("../middleware/permission.middleware");

// 查询
examRouter.get("/", list);
// 新增
examRouter.post("/", create);

module.exports = examRouter;
