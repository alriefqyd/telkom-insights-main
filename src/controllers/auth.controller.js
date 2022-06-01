const { authService, tokenService, userService } = require("../services");
const crypto = require("crypto");

const {
  getAccessToken,
  decodeToken,
  validatePayloadToken,
} = require("../utils/JWT");
module.exports = {
  refreshToken: async (req, res) => {
    try {
      // accessToken handler
      [jwt, errors] = getAccessToken(req.headers.authorization);
      if (errors) return res.failUnauthorized(errors);
      const accessTokenPayload = await decodeToken(jwt);
      const isValidAccessTokenPayload = await validatePayloadToken(
        accessTokenPayload
      );
      if (!isValidAccessTokenPayload)
        return res.failUnauthorized("Invalid Access Token");

      // check sub / user id is valid or not
      const user = await userService.find(accessTokenPayload.sub);
      if (!user) return res.failUnauthorized("User not found");

      // refreshToken handler
      const refreshTokenPayload = await decodeToken(req.body.refreshToken);
      const isValidRefreshTokenPayload = await validatePayloadToken(
        refreshTokenPayload
      );
      if (!isValidRefreshTokenPayload)
        return res.failUnauthorized("Invalid Refresh Token");
      if (accessTokenPayload.sub !== refreshTokenPayload.sub)
        return res.failUnauthorized("Invalid Refresh Token");

      const tokenData = await tokenService.find(
        user._id,
        accessTokenPayload.prm,
        refreshTokenPayload.prm
      );
      if (!tokenData) return res.failUnauthorized("Invalid Refresh Token");
      await tokenService.remove(tokenData._id);

      const accessKey = crypto.randomBytes(64).toString("hex");
      const refreshKey = crypto.randomBytes(64).toString("hex");

      await tokenService.create(user._id, accessKey, refreshKey);
      const tokens = await tokenService.generateTokens(
        user._id,
        accessKey,
        refreshKey
      );
      res.ok(
        { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken },
        "Success refresh access token"
      );
    } catch (error) {
      console.log(error.message);
      res.failServerError("Internal server_error when refresh token.");
    }
  },
  register: async (req, res) => {
    try {
      const [user, errors] = await authService.register(req.body);
      if (errors) return res.failValidationError(errors);
      const accessKey = crypto.randomBytes(64).toString("hex");
      const refreshKey = crypto.randomBytes(64).toString("hex");
      const token = await tokenService.generateTokens(
        user,
        accessKey,
        refreshKey
      );

      await tokenService.create(user._id, accessKey, refreshKey);
      const data = { ...user, ...{ token } };
      res.respondCreated(data, "User created successfully.");
    } catch (error) {
      console.log(error);
      res.failServerError("Internal Server Error When Creating User.");
    }
  },
  login: async function (req, res) {
    try {
      const [user, errors] = await authService.login(req.body);
      if (errors) return res.failValidationError(errors);
      const accessKey = crypto.randomBytes(64).toString("hex");
      const refreshKey = crypto.randomBytes(64).toString("hex");

      const token = await tokenService.generateTokens(
        user,
        accessKey,
        refreshKey
      );
      await tokenService.create(user._id, accessKey, refreshKey);
      const data = { ...user, ...{ token } };
      delete data.password;
      res.ok(data, "Login success.");
    } catch (e) {
      console.log(e);
      res.failServerError("Internal Server Error When Login.");
    }
  },
  logout: async function (req, res) {
    try {
      [jwt, errors] = getAccessToken(req.headers.authorization);
      const accessTokenPayload = await decodeToken(jwt);
      await tokenService.removeByUserId(accessTokenPayload.sub);
      res.respondDeleted("Logout Success.");
    } catch (error) {}
  },
};
