const errorHelpers = {
  ERR_JWT_NOT_FOUND: {
    code: "ERR_JWT_NOT_FOUND",
    message: "You must provide JWT token in header.",
  },
  ERR_JWT_EXPIRED: { code: "ERR_JWT_EXPIRED", message: "Your JWT has expired" },
  ERR_JWS_SIGNATURE_VERIFICATION_FAILED: {
    code: "ERR_JWS_SIGNATURE_VERIFICATION_FAILED",
    message: "Invalid JWT",
  },
  ERR_JWT_CLAIM_VALIDATION_FAILED: {
    code: "ERR_JWT_CLAIM_VALIDATION_FAILED",
    message: "Invalid JWT issuer or audience",
  },
  ERR_JWS_INVALID: {
    code: "ERR_JWS_INVALID",
    message: "Invalid JWT",
  },
};

const responseCodes = {
  ok: 200,
  created: 201,
  deleted: 200,
  updated: 200,
  no_content: 204,
  invalid_request: 400,
  unsupported_response_type: 400,
  invalid_scope: 400,
  invalid_grant: 400,
  invalid_credentials: 400,
  invalid_refresh: 400,
  no_data: 400,
  invalid_data: 400,
  access_denied: 401,
  unauthorized: 401,
  invalid_client: 401,
  forbidden: 403,
  resource_not_found: 404,
  not_acceptable: 406,
  resource_exists: 409,
  conflict: 409,
  resource_gone: 410,
  payload_too_large: 413,
  unsupported_media_type: 415,
  too_many_requests: 429,
  server_error: 500,
  unsupported_grant_type: 501,
  not_implemented: 501,
  temporarily_unavailable: 503,
};

const responseHelper = (req, res, next = null) => {
  // For pure NodeJS support.
  if (res.json === undefined) {
    res.json = (data) => {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(data));
    };
  }

  res.respond = (data = null, status = 200, message = "") => {
    res.statusCode = status;
    const response = {
      success: true,
      message,
    };
    if (data) response.data = data;
    res.json(response);
    // if (data === null) res.end({ success: true, message });
    // else res.json({ success: true, data });
  };

  res.fail = (messages, status = 400, code = null) => {
    const response = {
      success: false,
      code: code || status.toString(),
      messages: messages,
    };
    res.status(status).json(response);
    //res.respond(response, status);
  };

  res.ok = (data = null, message = "") => {
    console.log(message, data);
    res.respond(data, responseCodes.ok, message);
  };

  res.respondCreated = (data = null, message = "") => {
    res.respond(data, responseCodes.created, message);
  };

  res.respondDeleted = (message = "") => {
    res.respond(null, responseCodes.deleted, message);
  };

  res.respondUpdated = (data = null, message = "") => {
    res.respond(data, responseCodes.updated, message);
  };

  res.respondNoContent = () => {
    res.respond(null, responseCodes.no_content);
  };

  res.failUnauthorized = (description = "Unauthorized", code = null) => {
    res.fail(description, responseCodes.unauthorized, code);
  };

  res.failForbidden = (description = "Forbidden", code = null) => {
    res.fail(description, responseCodes.forbidden, code);
  };

  res.failNotFound = (description = "Not Found", code = null) => {
    res.fail(description, responseCodes.resource_not_found, code);
  };

  res.failValidationError = (description = "Bad Request", code = null) => {
    res.fail(description, responseCodes.invalid_data, code);
  };

  res.failResourceExists = (description = "Conflict", code = null) => {
    res.fail(description, responseCodes.resource_exists, code);
  };

  res.failResourceGone = (description = "Gone", code = null) => {
    res.fail(description, responseCodes.resource_gone, code);
  };

  res.failInvalidCredentials = (
    description = "Invalid Credentials",
    code = null
  ) => {
    res.fail(description, responseCodes.invalid_credentials, code);
  };

  res.failTooManyRequests = (
    description = "Too Many Requests",
    code = null
  ) => {
    res.fail(description, responseCodes.too_many_requests, code);
  };

  res.failServerError = (
    description = "Internal Server Error",
    code = null
  ) => {
    res.fail(description, responseCodes.server_error, code);
  };

  if (next !== null) next();
};

module.exports = {
  helper: () => responseHelper,
  responseCodes: responseCodes,
  errorHelpers,
};
