const connection = require("../app/database");

class CommentService {
  async create(content, user_id, momnet_id) {
    const statement = `INSERT INTO comment (content, user_id,moment_id) VALUES (?, ?,?);`;

    const [result] = await connection.execute(statement, [
      content,
      user_id,
      momnet_id,
    ]);

    return result;
  }

  async reply(content, user_id, momnet_id, comment_id) {
    const statement = `INSERT INTO comment (content, user_id,moment_id,comment_id) VALUES (?, ?,?,?);`;

    const [result] = await connection.execute(statement, [
      content,
      user_id,
      momnet_id,
      comment_id,
    ]);

    return result;
  }

  async update(content, id) {
    const statement = `UPDATE comment SET content = ? WHERE id = ? ;`;

    const [result] = await connection.execute(statement, [content, id]);

    return result;
  }

  async remove(id) {
    const statement = `DELETE FROM comment WHERE id = ?`;

    const [result] = await connection.execute(statement, [id]);

    return result;
  }

  async getCommentByMomentId(moment_id) {
    const statement = `
      SELECT 
        co.id id,co.content,co.comment_id commentId,co.createAt createTime,
        JSON_OBJECT("id",us.id,"name",us.name,"avatarUrl",us.avatar_url) user
      FROM comment co
      LEFT JOIN users us ON us.id = co.user_id
      WHERE moment_id = ?;    
    `;

    const [result] = await connection.execute(statement, [moment_id]);

    return result;
  }
}

module.exports = new CommentService();
