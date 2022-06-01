var { nanoid } = require("nanoid");
const fs = require("fs");
const path = require("path");
const { Token, User } = require("../models");
const { importPKCS8, importSPKI, jwtVerify, SignJWT } = require("jose");
module.exports = {
  create: async (_id, accessKey, refreshKey) => {
    const user = await User.findOne({ _id });
    return await Token.create({ user, accessKey, refreshKey });
  },
  find: async (_id, accessKey, refreshKey) => {
    const user = await User.findOne({ _id });
    return await Token.findOne({ user, accessKey, refreshKey });
  },
  findForVerifyToken: async (_id, accessKey) => {
    const user = await User.findOne({ _id });
    return await Token.findOne({ user, accessKey, isActive: true });
  },
  remove: async (_id) => {
    await Token.remove({ _id });
  },
  removeByUserId: async (userId) => {
    await Token.remove({ user: userId });
  },
  generateTokens: async (data, accessKey, refreshKey) => {
    const keyPath = path.join(__dirname, "../../keys/eddsa-private.pem");
    const privateKey = fs.readFileSync(keyPath, "utf8");
    const accessPayload = {
      iss: process.env.JWT_ISSUER, // who created this token
      sub: data._id, // whom the token refers to
      aud: process.env.JWT_AUDIENCE, //who or what token is indented for
      exp:
        Math.floor(Date.now() / 1000) +
        60 * 60 * 24 * process.env.ACCESS_TOKEN_EXPIRATION_DAYS,
      nbf: Math.floor(Date.now() / 1000), // not valid before
      jti: await nanoid(), // unique ID for this token
      prm: accessKey,
      data,
    };
    const refreshPayload = {
      iss: process.env.JWT_ISSUER, // who created this token
      sub: data._id, // whom the token refers to
      aud: process.env.JWT_AUDIENCE, //who or what token is indented for
      exp:
        Math.floor(Date.now() / 1000) +
        60 * 60 * 24 * process.env.REFRESH_TOKEN_EXPIRATION_DAYS,
      nbf: Math.floor(Date.now() / 1000), // not valid before
      jti: await nanoid(), // unique ID for this token
      prm: refreshKey,
      data,
    };
    const importedPrivateKey = await importPKCS8(privateKey, "EdDSA");
    const accessToken = await new SignJWT(accessPayload)
      .setProtectedHeader({ alg: "EdDSA" })
      .sign(importedPrivateKey);
    const refreshToken = await new SignJWT(refreshPayload)
      .setProtectedHeader({ alg: "EdDSA" })
      .sign(importedPrivateKey);
    return { accessToken, refreshToken };
  },
};
