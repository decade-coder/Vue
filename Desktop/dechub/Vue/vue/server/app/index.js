const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

const registerRouters = require("../router");

const app = new Koa();

app.use(bodyParser());
app.use(cors());

registerRouters(app);

module.exports = app;
