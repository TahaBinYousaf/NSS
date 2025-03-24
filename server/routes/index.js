const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const postRouter = require("./postRoutes");
const messageRouter = require("./messageRoute");

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/message", messageRouter);

module.exports = router;
