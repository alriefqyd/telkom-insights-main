const { errorHelpers } = require("../utils/responseHelper");
const { tokenService } = require("../services");
const {
  getAccessToken,
  decodeToken,
  validatePayloadToken,
} = require("../utils/JWT");

async function verifyToken(req, res, next) {
  try {
    [jwt, errors] = getAccessToken(req.headers.authorization);
    if (errors) return res.failUnauthorized(errors);

    const payload = await decodeToken(jwt);
    const isValidPayload = await validatePayloadToken(payload);
    if (!isValidPayload) return res.failUnauthorized("Invalid Access Token");

    const token = await tokenService.findForVerifyToken(
      payload.sub,
      payload.prm
    );
    if (!token) return res.failInvalidCredentials("Invalid Token");
    next();
  } catch (error) {
    if (errorHelpers[error.code]) {
      return res.failValidationError(
        errorHelpers[error.code].message,
        errorHelpers[error.code].code
      );
    }
    console.log(error);
    res.failServerError(error.message);
  }
}

module.exports = {
  verifyToken,
};
