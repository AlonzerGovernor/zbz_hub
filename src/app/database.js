const mysql = require("mysql2");
const config = require("./config");

const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  password: config.MYSQL_PASSWORD,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  database: config.MYSQL_DATABASE,
});

connection.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败", err);
    } else {
      console.log("数据库连接成功~");
    }
  });
});

module.exports = connection.promise();
