const connection = require("../app/database");

class FileService {
  async createAvatar(mimetype, filename, size, user_id) {
    const statement = `INSERT INTO avatar (mimetype,filename,size,user_id) VALUES (?,?,?,?)`;

    const [result] = await connection.execute(statement, [
      mimetype,
      filename,
      size,
      user_id,
    ]);

    return result;
  }

  async getAvatarByUserId(user_id) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?`;

    const [result] = await connection.execute(statement, [user_id]);

    return result[0];
  }

  async createPicture(mimetype, filename, size, user_id, moment_id) {
    const statement = `INSERT INTO file (mimetype,filename,size,user_id,moment_id) VALUES (?,?,?,?,?);`;

    const [result] = await connection.execute(statement, [
      mimetype,
      filename,
      size,
      user_id,
      moment_id,
    ]);

    return result;
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?`;

    const [result] = await connection.execute(statement, [filename]);

    return result[0];
  }
}

module.exports = new FileService();
