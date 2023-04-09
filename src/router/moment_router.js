const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth_middleware");
const { verifyLableExists } = require("../middleware/label_middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
  momentAddLabels,
  fileInfo,
} = require("../controller/moment_controller");

const momentRouter = new Router({ prefix: "/moment" });
momentRouter.post("/", verifyAuth, create);
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLableExists,
  momentAddLabels
);
momentRouter.get("/images/:filename", fileInfo);

module.exports = momentRouter;
