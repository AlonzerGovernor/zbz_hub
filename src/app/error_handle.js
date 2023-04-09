const errorTypes = require("../constants/error_types");

const errorHandle = (err, ctx) => {
  let status, message;

  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; //Bad Request
      message = "用户名或密码不能为空 捏~";
      break;
    case errorTypes.USER_NAME_ALREADY_EXISTS:
      status = 409; //Conflict
      message = "用户名已存在 捏~";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400; //参数错误
      message = "用户不存在 捏~";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400; //参数错误
      message = "密码不对 捏~";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401; //unauthorization
      message = "登录过期 捏~";
      break;
    case errorTypes.UNPERMISSION:
      status = 401; //unpermission
      message = "没有用户权限 捏~";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.body = message;
  ctx.status = status;
};

module.exports = errorHandle;
