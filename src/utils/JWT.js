const fs = require("fs");
const path = require("path");
const { importSPKI, jwtVerify } = require("jose");
const mongoose = require("mongoose");
const getAccessToken = (authorization) => {
  if (!authorization) return [null, "Token not found in header."];
  if (!authorization.startsWith("Bearer "))
    return [null, "Invalid Authorization"];
  return [authorization.split(" ")[1], null];
};

const validatePayloadToken = (payload) => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== process.env.JWT_ISSUER ||
    payload.aud !== process.env.JWT_AUDIENCE ||
    !mongoose.Types.ObjectId.isValid(payload.sub)
  )
    return false;
  return true;
};

const decodeToken = async (token) => {
  const certPath = path.join(__dirname, "../../keys/eddsa-public.pem");
  const publicKey = fs.readFileSync(certPath, "utf8");
  const importedPublicKey = await importSPKI(publicKey, "EdDSA");
  const { payload, protectedHeader } = await jwtVerify(
    token,
    importedPublicKey,
    {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    }
  );
  return payload;
};

module.exports = { getAccessToken, decodeToken, validatePayloadToken };
