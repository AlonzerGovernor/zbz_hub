const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;

    /* 将用户存储到数据库中 */
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`;

    const result = await connection.execute(statement, [name, password]);

    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;

    const result = await connection.execute(statement, [name]);

    return result[0];
  }

  async updateAvatarUrlById(avatar_url, id) {
    const statement = `UPDATE users SET avatar_url= ? WHERE id = ?`;

    await connection.execute(statement, [avatar_url, id]);
  }
}

module.exports = new UserService();
