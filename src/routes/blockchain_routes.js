"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var Blockchain_1 = require("../Apps/Blockchain");
var FakeData_1 = require("../Apps/FakeData");
var blockChain = new Blockchain_1["default"]();
/* GET users listing. */
router.get("/initialize", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output, err_1, errorMsg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, blockChain.initialize()];
            case 1:
                output = _a.sent();
                res.send(output);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("Error in initialize api :>> ", err_1);
                errorMsg = JSON.stringify(err_1);
                res.status(404).json({ "Error Massage": errorMsg });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, email, contact, password, body, output;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, email = _a.email, contact = _a.contact, password = _a.password, body = _a.body;
                return [4 /*yield*/, blockChain.create({
                        _firstname: firstname,
                        _lastname: lastname,
                        _email: email,
                        _contact: contact,
                        _password: password,
                        _body: JSON.stringify(body)
                    })];
            case 1:
                output = _b.sent();
                console.log("output :>> ", output);
                res.send(output);
                return [2 /*return*/];
        }
    });
}); });
router.get("/hiveData", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, blockChain.hiveData()];
            case 1:
                output = _a.sent();
                res.send(output);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.send(404);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/hiveData", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, blockChain.hiveData()];
            case 1:
                output = _a.sent();
                res.send(JSON.stringify(output));
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.send(404);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/fillup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, FakeData_1.dataGen)(req.body.number)];
            case 1:
                output = _a.sent();
                res.send(JSON.stringify(output));
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.send(404);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/faketr", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, count, amount, load, output, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, count = _a.count, amount = _a.amount, load = _a.load;
                return [4 /*yield*/, (0, FakeData_1.faketr)(count, amount, load)];
            case 1:
                output = _b.sent();
                res.send(JSON.stringify(output));
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                res.send(404);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/validateChain", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, blockChain.validateChain()];
            case 1:
                output = _a.sent();
                res.send(JSON.stringify(output));
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
