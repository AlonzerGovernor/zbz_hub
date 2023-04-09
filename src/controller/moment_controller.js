const fs = require("fs");
const path = require("path");

const service = require("../service/moment_service");
const fileService = require("../service/file_service");
const { PICTURE_PATH } = require("../constants/file_path");

class momentController {
  async create(ctx, next) {
    /* 获取用户传递参数 */
    const user_id = ctx.user.id;
    const content = ctx.request.body.content;

    /* 插入数据 */
    const result = await service.create(user_id, content);

    /* 返回数据 */
    ctx.body = result;
  }

  async detail(ctx, next) {
    /* 获取动态信息 */
    const id = ctx.params.momentId;

    /* 查询数据 */
    const result = await service.getContentById(id);

    ctx.body = result;
  }

  async list(ctx, next) {
    /* 获取条数信息 */
    const { offset, size } = ctx.request.query;

    /* 查询数据 */
    const result = await service.getContentByPage(offset, size);

    ctx.body = result;
  }

  async update(ctx, next) {
    const id = ctx.params.momentId;
    const content = ctx.request.body.content;

    const result = await service.update(content, id);

    ctx.body = result;
  }

  async remove(ctx, next) {
    const id = ctx.params.momentId;

    const result = await service.remove(id);

    ctx.body = result;
  }

  async momentAddLabels(ctx, next) {
    const momentId = ctx.params.momentId;
    const { labels } = ctx;

    for (let label of labels) {
      const isExist = await service.momentHasLabel(momentId, label.id);
      if (!isExist) {
        await service.momentAddLabels(momentId, label.id);
      }
    }

    ctx.body = "给动态添加标签成功 捏~";
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const { type } = ctx.query;

    const fileInfo = await fileService.getFileByFilename(filename);

    const types = ["small", "large", "middle"];
    if (types.some((item) => item === type)) {
      const fileNoEx = path.parse(filename).name;
      const ex = path.extname(filename);
      filename = fileNoEx + "-" + type + ex;
    }

    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new momentController();
