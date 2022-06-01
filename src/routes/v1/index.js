const router = require("express").Router();
const API_URL = "/api/v1";
const auth = require("./auth.router");
const role = require("./role.router");
const feedback = require("./feedback.router");
router.use(API_URL + "/auth", auth);
router.use(API_URL + "/roles", role);
router.use(API_URL + "/feedback", feedback);
module.exports = router;
