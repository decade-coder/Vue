const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
app.use(bodyParser());

app.use(async (ctx) => {
  console.log("xxxx", ctx.request.body);
});
app.listen(9000, () => {
  console.log("系统2222后台已启动...");
});
