const service = require("../service/comment_service");

class commentController {
  async create(ctx, next) {
    const id = ctx.user.id;
    const { content, momentId } = ctx.request.body;

    const result = await service.create(content, id, momentId);

    ctx.body = result;
  }

  async reply(ctx, next) {
    const id = ctx.user.id;
    const { content, momentId } = ctx.request.body;
    const commentId = ctx.params.commentId;

    const result = await service.reply(content, id, momentId, commentId);

    ctx.body = result;
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await service.update(content, commentId);

    ctx.body = result;
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;

    const result = await service.remove(commentId);

    ctx.body = result;
  }

  async list(ctx, next) {
    const { momentId } = ctx.request.query;

    const result = await service.getCommentByMomentId(momentId);

    ctx.body = result;
  }
}

module.exports = new commentController();
