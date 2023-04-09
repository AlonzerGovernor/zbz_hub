const fileService = require("../service/file_service");
const userService = require("../service/user_service");
const { APP_PORT, APP_HOST } = require("../app/config");

class FileController {
  async saveAvatarInfo(ctx, next) {
    /* 获取图像信息 */
    const { id } = ctx.user;
    const { mimetype, filename, size } = ctx.req.file;
    /* 存储图像信息 */
    await fileService.createAvatar(mimetype, filename, size, id);

    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);

    ctx.body = "上传头像成功";
  }

  async savePictureInfo(ctx, next) {
    const { id } = ctx.user;
    const files = ctx.req.files;
    const { momentId } = ctx.query;

    for (let file of files) {
      const { mimetype, filename, size } = file;
      await fileService.createPicture(mimetype, filename, size, id, momentId);
    }

    ctx.body = "动态图片上传成功";
  }
}

module.exports = new FileController();
