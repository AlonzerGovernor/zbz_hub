const Router = require("koa-router");
const { create, list } = require("../controller/label_controller");
const { verifyAuth } = require("../middleware/auth_middleware");

const labelRouter = new Router({ prefix: "/label" });
labelRouter.post("/", verifyAuth, create);
labelRouter.get("/", list);

module.exports = labelRouter;
