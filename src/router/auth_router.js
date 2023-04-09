const Router = require("koa-router");
const { login, success } = require("../controller/auth_controller");
const { verifyLogin, verifyAuth } = require("../middleware/auth_middleware");

const authRouter = new Router();
authRouter.post("/login", verifyLogin, login);
authRouter.get("/demo", verifyAuth, success);

module.exports = authRouter;
