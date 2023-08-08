const connection = require("../app/database");

class UserService {
  async login(username, password) {
    const statement = `SELECT * FROM e_main`;
    const [result] = await connection.execute(statement, [size, offset]);
    return result;
  }
}

module.exports = new UserService();
