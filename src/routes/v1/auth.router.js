const router = require("express").Router();
const { verifyToken } = require("../../middleware/auth");
const validator = require("../../utils/validator");
const { authController } = require("../../controllers");

router.post(
  "/register",
  validator.emailValidator,
  validator.passwordValidator,
  validator.nameValidator,
  validator.roleTypeValidator,
  validator.result,
  authController.register
);

router.post(
  "/login",
  validator.emailValidator,
  validator.passwordValidator,
  validator.result,
  authController.login
);

router.post(
  "/refresh",
  validator.refreshTokenValidator,
  validator.result,
  authController.refreshToken
);

router.delete("/logout", verifyToken, authController.logout);

router.get("/secure", verifyToken, function (req, res) {
  res.ok("ok");
});

// router.post(
//   "/send-verification-email",
//   validator.emailValidator,
//   validator.result,
//   auth.sendVerificationEmail
// );

// router.get(
//   "/verify-email",
//   validator.tokenValidator,
//   validator.result,
//   auth.verifyEmail
// );

module.exports = router;
