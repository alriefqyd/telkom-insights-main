const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const xXssProtection = require("x-xss-protection");
const compression = require("compression");
const routes = require("./routes/v1");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const responseHelper = require("./utils/responseHelper");
const connectDB = require("./utils/connectDB");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// security section
app.use(xXssProtection());
app.use(mongoSanitize());
app.use(helmet());

// gzip compression
app.use(compression());
connectDB();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

if (process.env.NODE_ENV !== "production") {
  //app.use("/v1/auth", authLimiter);
  app.use(limiter);
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(responseHelper.helper());
app.use(routes);

// app.set("view engine", "ejs");

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
