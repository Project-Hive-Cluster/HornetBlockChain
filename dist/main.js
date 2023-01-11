"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
//Route configuration
var authRouter = require("./src/routes/auths_routes");
var vartixRouter = require("./src/routes/vartix_routes");
var blockChainRouter = require("./src/routes/blockchain_routes");
var walletRouter = require("./src/routes/wallet_routes");
require("dotenv").config();
var secret = "mysecret"; // A secret key for signing the JWT
var refreshSecret = "myrefreshsecret";
// Optations
var corsOptions = {
    origin: "*"
};
// Add on
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])(corsOptions));
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use((0, cookie_parser_1["default"])());
// Routes
app.use("/", authRouter);
app.use("/blockchain", blockChainRouter);
app.use("/vartix", vartixRouter);
app.use("/wallet", walletRouter);
app.get("/*", function (res) {
    res.status(404).json({ Error: "Invalid Address" });
});
exports["default"] = app;
//# sourceMappingURL=main.js.map