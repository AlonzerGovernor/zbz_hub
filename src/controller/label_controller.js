const service = require("../service/label_service");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;

    const result = await service.create(name);

    ctx.body = result;
  }

  async list(ctx, next) {
    const { offset, size } = ctx.request.query;

    const result = await service.list(offset, size);

    ctx.body = result;
  }
}

module.exports = new LabelController();
