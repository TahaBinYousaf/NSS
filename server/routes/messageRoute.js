const express = require("express");
const { send, getAll } = require("../controllers/messageController.js");

const { verifyToken } = require("../middleware/authMiddleware.js");


const router = express.Router();

router.post("/", verifyToken, send);
router.get("/:userId", verifyToken, getAll);

module.exports = router;
