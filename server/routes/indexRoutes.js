const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/items", require("./itemRoutes"));
router.use("/posts", require("./postRoutes"));
router.use("/logout", require("./logoutRoute").router);

module.exports = router;
