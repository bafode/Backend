const express = require("express");
const router = express.Router();

const { cancelById, create, read } = require("../controllers/cancel");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/cancel/:cancelId", read);
router.post("/cancel/create/:userId", requireSignin, isAuth, create);

router.param("userId", userById);
router.param("cancelId", cancelById);

module.exports = router;
