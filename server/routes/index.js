const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const postRouter = require("./postRoutes");

router.use("/auth", authRouter);
router.use("/post", postRouter);

module.exports = router;
