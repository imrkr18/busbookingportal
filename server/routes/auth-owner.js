const express = require("express");

const {
  signup,
  signin,
  refreshToken
} = require("../controllers/auth-owner");

const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/signup",userSignupValidator, signup);   // userSignupValidator, can be added as middleware
router.post("/signin", signin);
router.post("/refreshtoken", refreshToken);
// router.post("/auth-owner/sign")

module.exports = router;