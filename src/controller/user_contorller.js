const fs = require("fs");

const userService = require("../service/user_service");
const fileService = require("../service/file_service");
const { AVATAR_PATH } = require("../constants/file_path");

class UserContorller {
  async create(ctx, next) {
    /* 获取用户传递参数 */
    const user = ctx.request.body;
    /* 查询数据 */
    const result = await userService.create(user);
    /* 返回数据 */
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;

    const avatarInfo = await fileService.getAvatarByUserId(userId);

    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserContorller();
