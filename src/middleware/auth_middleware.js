const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");
const errorTypes = require("../constants/error_types");
const userService = require("../service/user_service");
const authSerice = require("../service/auth_service");
const md5Password = require("../utils/password_handle");

/* 验证登录 */
const verifyLogin = async (ctx, next) => {
  /* 获取用户名和密码 */
  const { name, password } = ctx.request.body;

  /* 判断用户名和密码是否为空 */
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);

    return ctx.app.emit("error", error, ctx);
  }

  /* 判断用户是否存在 */
  const result = await userService.getUserByName(name);
  const user = result[0];

  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);

    return ctx.app.emit("error", error, ctx);
  }

  /* 判断密码是否一致 */
  const passwordByMd5 = md5Password(password);
  if (passwordByMd5 !== user.password) {
    const error = new Error(errorTypes.PASSWORD_DOSE_NOT_MATCH);

    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;

  await next();
};

/* 验证授权 */
const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  const anthorization = ctx.headers.authorization;
  if (!anthorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
  const token = anthorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;

    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

/* 验证权限 */
const verifyPermission = async (ctx, next) => {
  const [resourcekey] = Object.keys(ctx.params);
  const tableName = resourcekey.replace("Id", "");
  const { id } = ctx.user;
  const resourceId = ctx.params[resourcekey];

  /* 第一个参数是moment 第二个参数是用户id */
  const isPermission = await authSerice.checkResource(
    tableName,
    resourceId,
    id
  );

  if (!isPermission) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
