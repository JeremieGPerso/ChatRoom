const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const membersController = require("../controllers/membersController");

router.get("/", auth, membersController.getAllMembers);

module.exports = router;
