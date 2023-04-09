const errorTypes = require("../constants/error_types");
const service = require("../service/user_service");
const md5Password = require("../utils/password_handle");

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  /* 判断用户名和密码不为空 */
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);

    return ctx.app.emit("error", error, ctx);
  }

  /* 判断用户名不重复 */
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_NAME_ALREADY_EXISTS);

    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);

  await next();
};

module.exports = { verifyUser, handlePassword };
