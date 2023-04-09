const connection = require("../app/database");

class AuthService {
  async checkResource(tableName, id, user_id) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? and user_id = ?;`;
    const [result] = await connection.execute(statement, [id, user_id]);

    return result[0];
  }
}

module.exports = new AuthService();
