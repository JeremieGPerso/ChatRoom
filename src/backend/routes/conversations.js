const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const conversationsController = require("../controllers/conversationsController");

router.get("/", auth, conversationsController.getAllConversations);
router.get("/:id", auth, conversationsController.getOneConversation);

module.exports = router;
