const app = require("./app");
const { SERVER_PORT } = require("./config/server");

app.listen(SERVER_PORT, () => {
  console.log("系统后台已启动...", SERVER_PORT);
});
