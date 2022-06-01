const { check, validationResult } = require("express-validator");
const { roleTypesArray } = require("../config/roles");
module.exports = {
  emailValidator: check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .toLowerCase()
    .withMessage("Invalid email format"),

  passwordValidatorSignin: check("password")
    .notEmpty()
    .withMessage("Password is required"),

  passwordValidator: check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long"),

  nameValidator: check("name").notEmpty().withMessage("Name is required"),

  titleValidator: check("title").notEmpty().withMessage("Title is required"),

  urlValidator: check("url").notEmpty().withMessage("Filepath url is required"),

  //  refreshTokenValidator = check("refreshToken")
  //   .notEmpty()
  //   .withMessage("Refresh Token is required"),

  idValidator: check("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("ID is invalid"),

  //  imageValidator = check("image")
  //   .custom((value, { req }) => {
  //     return req["file"] !== undefined ? true : false;
  //   })
  //   .withMessage("Image is required")
  //   .custom((value, { req }) => {
  //     return req["file"].mimetype === "image/jpeg" ||
  //       req["file"].mimetype === "image/png"
  //       ? true
  //       : false;
  //   })
  //   .withMessage("You can only upload image with format .jpg, .jpeg, .png"),
  tokenValidator: check("token")
    .notEmpty()
    .withMessage("Token is required")
    .isLength({ min: 48 })
    .withMessage("Password must be at least 48 chars long"),

  roleTypeValidator: check("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(roleTypesArray)
    .withMessage("Invalid role type name"),

  refreshTokenValidator: check("refreshToken")
    .notEmpty()
    .withMessage("Refresh token is required")
    .isJWT()
    .withMessage("Invalid refresh token"),

  result: (req, res, next) => {
    console.log();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(403)
        .json({ messages: "Validation error", errors: errors.array() });
      //return res.failValidationError(errors.array());
    }
    next();
  },
};
