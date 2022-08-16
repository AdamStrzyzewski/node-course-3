const { Router } = require("express");
const authMiddleware = require("../middlewares/jwt");
const router = Router();

router.use("/auth", require("./auth"));
router.use("/list", authMiddleware, require("./list"));

module.exports = router;
