const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;

    const [result] = await connection.execute(statement, [name]);

    return result;
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;

    const [result] = await connection.execute(statement, [name]);

    return result[0];
  }

  async list(offset, size) {
    const statement = `SELECT id,name FROM label ORDER BY id LIMIT ?,? ;`;

    const [result] = await connection.execute(statement, [offset, size]);

    return result;
  }
}

module.exports = new LabelService();
