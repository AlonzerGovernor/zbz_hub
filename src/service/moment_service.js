const connection = require("../app/database");

class MomentService {
  async create(user_id, content) {
    /* 将动态插入数据库中 */
    const statement = `INSERT INTO moment (user_id,content) VALUES (?,?);`;
    const [result] = await connection.execute(statement, [user_id, content]);

    return result;
  }

  async getContentById(id) {
    /* const statement = `SELECT * FROM moment WHERE id = ?;`; */
    const statement = `
      SELECT mo.content content,mo.id id,
        mo.createAt createTime,mo.updateAt updateTime,
        JSON_OBJECT(
          "name",us.name,
          "id",us.id,
          "avatarUrl",us.avatar_url
        ) user,
        IF(
          COUNT(co.id),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "id",co.id,
              "commentId",co.comment_id,
              "content",co.content,
              "createTime",co.createAt,
              "user",JSON_OBJECT(
                  "id",cus.id,
                  "name",cus.name,
                  "avatarUrl",cus.avatar_url
              )
            )
          ),
          NULL
        ) commentList,
        (SELECT 
          IF(COUNT(la.id),JSON_ARRAYAGG(
            JSON_OBJECT(
              "id",la.id,
              "name",la.name
            )
          ),NULL)
          FROM moment mm
          LEFT JOIN moment_label ml ON ml.moment_id = mm.id
          LEFT JOIN label la ON la.id = ml.label_id
          WHERE mm.id = ml.moment_id
        ) labelList ,
        (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:8000/moment/images/",fi.filename)) FROM file fi WHERE fi.moment_id = mo.id) images
      FROM moment  mo 
      LEFT JOIN users us ON us.id = mo.user_id 
      LEFT JOIN comment co ON co.moment_id = mo.id
      LEFT JOIN users cus ON cus.id = co.user_id
      WHERE mo.id = ?
      GROUP BY mo.id;
                    `;
    const [result] = await connection.execute(statement, [id]);

    return result[0];
  }

  async getContentByPage(offset, size) {
    const statement = `
        SELECT mo.content content,mo.id id,mo.createAt createTime,mo.updateAt updateTime,
            JSON_OBJECT("name",us.name,"id",us.id) as user ,
            (SELECT COUNT(*) FROM comment co WHERE co.moment_id = mo.id) commentCount,
            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = mo.id) labelCount,
            (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:8000/moment/images/",fi.filename)) FROM file fi WHERE fi.moment_id = mo.id) images
        FROM moment  mo LEFT JOIN users  us ON us.id = mo.user_id
        LIMIT ?,?;
    `;

    const [result] = await connection.execute(statement, [offset, size]);

    return result;
  }

  async update(content, id) {
    const statement = `UPDATE moment SET content = ? WHERE id = ? ;`;

    const [result] = await connection.execute(statement, [content, id]);

    return result;
  }

  async remove(id) {
    const statement = `DELETE FROM moment WHERE id = ?`;

    const [result] = await connection.execute(statement, [id]);

    return result;
  }

  async momentHasLabel(moment_id, label_id) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;

    let [result] = await connection.execute(statement, [moment_id, label_id]);

    return !result.length ? false : true;
  }

  async momentAddLabels(moment_id, label_id) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);`;

    const [result] = await connection.execute(statement, [moment_id, label_id]);

    return result;
  }
}

module.exports = new MomentService();
