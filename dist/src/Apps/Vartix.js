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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var crypto_1 = __importDefault(require("crypto"));
var Vartix = /** @class */ (function () {
    function Vartix() {
        var _this = this;
        this.make = function (_from, _to, _amount, _body) {
            if (_body === void 0) { _body = undefined; }
            return __awaiter(_this, void 0, void 0, function () {
                var to_temp_block, inNode, to_balance, to_hash, from_temp_block, from_balance, outNode, from_hash, tr_amount, trno, date, timestamp, e_1, e_2, from_ref, to_ref, _data, e_3, hive_to_block, hive_to_block_amount, to_temp_amount, e_4, hive_from_block, hive_from_temp_amount, e_5, _balance, err_1, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 39, , 40]);
                            /*  Initialize Depanded variable */
                            console.log("*//> Accessing Initialize Block");
                            if (!_from || !_to || !_amount) {
                                return [2 /*return*/, "Value must not be a null"];
                            }
                            if (_amount >= 0 && _amount == undefined) {
                                return [2 /*return*/, "Balance cannot be less than 1"];
                            }
                            to_temp_block = undefined;
                            return [4 /*yield*/, this.lastHash(_to)];
                        case 1:
                            inNode = _a.sent();
                            to_balance = 0;
                            to_hash = void 0;
                            from_temp_block = undefined;
                            from_balance = 0;
                            return [4 /*yield*/, this.lastHash(_from)];
                        case 2:
                            outNode = _a.sent();
                            from_hash = void 0;
                            tr_amount = 0;
                            return [4 /*yield*/, this.mktrno()];
                        case 3:
                            trno = _a.sent();
                            date = new Date();
                            timestamp = date.toString();
                            console.log(":/ to />", typeof _to, _to);
                            /*************************************
                      
                              geting blocks and balance
                            
                            ***************************************/
                            console.log("*//> Accessing Schema Block");
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 11, , 12]);
                            return [4 /*yield*/, prisma.vertixSchema.findFirst({
                                    where: {
                                        walletid: _to
                                    },
                                    orderBy: {
                                        walletid: "desc"
                                    }
                                })];
                        case 5:
                            to_temp_block = _a.sent();
                            return [4 /*yield*/, prisma.vertixSchema.findFirst({
                                    where: {
                                        walletid: _from
                                    },
                                    orderBy: {
                                        walletid: "desc"
                                    }
                                })];
                        case 6:
                            from_temp_block = _a.sent();
                            if (!(!to_temp_block || to_temp_block === null)) return [3 /*break*/, 8];
                            console.log("to_temp_block is found null");
                            return [4 /*yield*/, prisma.hiveSchema.findFirst({
                                    where: {
                                        walletid: _to
                                    }
                                })];
                        case 7:
                            to_temp_block = _a.sent();
                            _a.label = 8;
                        case 8:
                            if (!!from_temp_block) return [3 /*break*/, 10];
                            console.log("from_temp_block is found null");
                            return [4 /*yield*/, prisma.hiveSchema.findFirst({
                                    where: {
                                        walletid: _from
                                    }
                                })];
                        case 9:
                            from_temp_block = _a.sent();
                            _a.label = 10;
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            e_1 = _a.sent();
                            return [2 /*return*/, "Error getting schema data" + e_1];
                        case 12:
                            /*
                      
                            -----------------------------------------
                                        Getting Balance
                            -----------------------------------------
                      
                            */
                            console.log("*//> Accessing Balance Block");
                            _a.label = 13;
                        case 13:
                            _a.trys.push([13, 16, , 17]);
                            return [4 /*yield*/, this.balance(_to)];
                        case 14:
                            to_balance = _a.sent();
                            return [4 /*yield*/, this.balance(_from)];
                        case 15:
                            from_balance = _a.sent();
                            console.log("to_balance", to_balance);
                            console.log("from_balance", from_balance);
                            return [3 /*break*/, 17];
                        case 16:
                            e_2 = _a.sent();
                            console.log("Error getting balance. ", e_2);
                            return [3 /*break*/, 17];
                        case 17:
                            /*
                            -----------------------------------------
                                        Balance check
                            -----------------------------------------
                            */
                            console.log("*//> Accessing Balance Check Block");
                            tr_amount = parseInt(_amount.toString());
                            if (_from != "0000000000000000") {
                                if (from_balance <= 0)
                                    return [2 /*return*/, "Insufficient Balance. Balance:" + from_balance];
                                if (from_balance - tr_amount == 0)
                                    return [2 /*return*/, "Insufficient Balance. Balance:" + from_balance];
                            }
                            else {
                                console.log("Msg://> Balance Check Ignored");
                            }
                            /*
                      
                            -----------------------------------------
                                        Hashing
                            -----------------------------------------
                      
                            */
                            console.log("*//> Accessing Hash relocated Block");
                            from_ref = from_temp_block.hash;
                            console.log("Out://> Hash From:", from_ref);
                            to_ref = to_temp_block.hash;
                            console.log("Out://> Hash To:", to_ref);
                            if (!(!_from ||
                                !from_ref ||
                                !to_ref ||
                                !timestamp ||
                                !_amount ||
                                !_to ||
                                !_body)) return [3 /*break*/, 18];
                            console.log("Msg://> Veriable: _from", _from, "</ from_ref >", from_ref, "</ to_ref>", to_ref, "</ timestamp>", timestamp, "</ _amount>", _amount, "</ _to>", _to, "</ _body>", _body);
                            console.log("Error not enough veriable fro hasing operation.");
                            return [2 /*return*/, "Error not enough veriable fro hasing operation."];
                        case 18:
                            console.log("*//> Accessing Hashing  Block");
                            return [4 /*yield*/, this.V_hashing(_from, from_ref, timestamp, _amount, _to, _from, _body)];
                        case 19:
                            from_hash = _a.sent();
                            return [4 /*yield*/, this.V_hashing(_to, to_ref, timestamp, _amount, _from, _to, _body)];
                        case 20:
                            to_hash = _a.sent();
                            _a.label = 21;
                        case 21:
                            // if body null
                            _body ? _body : "Transfer from ".concat(_from, " to ").concat(_to, " at ").concat(timestamp);
                            /*
                            -----------------------------------------
                                        block data
                            -----------------------------------------
                            */
                            console.log("*//> Accessing Hash Data.");
                            _data = [
                                {
                                    walletid: _from,
                                    transaction_no: trno.toString(),
                                    transaction_count: 1,
                                    timestamp: timestamp,
                                    ref: from_ref,
                                    edge_in: _to.toString(),
                                    edge_out: _from.toString(),
                                    hash: from_hash,
                                    debit: tr_amount,
                                    credit: 0,
                                    body: _body
                                },
                                {
                                    walletid: _to,
                                    transaction_no: trno.toString(),
                                    transaction_count: 2,
                                    timestamp: timestamp,
                                    ref: to_ref,
                                    edge_in: _from.toString(),
                                    edge_out: _to.toString(),
                                    hash: to_hash,
                                    debit: 0,
                                    credit: tr_amount,
                                    body: _body
                                },
                            ];
                            _a.label = 22;
                        case 22:
                            _a.trys.push([22, 37, , 38]);
                            _a.label = 23;
                        case 23:
                            _a.trys.push([23, 25, , 26]);
                            console.log("*//> Updateing Vartix Data.");
                            return [4 /*yield*/, prisma.vertixSchema.createMany({
                                    data: _data
                                })];
                        case 24:
                            _a.sent();
                            return [3 /*break*/, 26];
                        case 25:
                            e_3 = _a.sent();
                            console.log("Error//: error while updating vartix" + e_3);
                            return [3 /*break*/, 26];
                        case 26:
                            _a.trys.push([26, 30, , 31]);
                            console.log("*//> Updateing Hive Data for sender.");
                            return [4 /*yield*/, prisma.hiveSchema.findFirst({
                                    where: { walletid: _to }
                                })];
                        case 27:
                            hive_to_block = _a.sent();
                            hive_to_block_amount = 0;
                            hive_to_block_amount = hive_to_block === null || hive_to_block === void 0 ? void 0 : hive_to_block.amount;
                            if (hive_to_block_amount === undefined) {
                                hive_to_block_amount = 0;
                            }
                            to_temp_amount = hive_to_block_amount + tr_amount;
                            console.log("??>>:", to_temp_amount);
                            return [4 /*yield*/, prisma.hiveSchema.updateMany({
                                    where: { walletid: _to },
                                    data: { amount: { set: to_temp_amount } }
                                })];
                        case 28:
                            _a.sent();
                            return [4 /*yield*/, prisma.hiveSchema.updateMany({
                                    where: { walletid: _from },
                                    data: { amount: { set: to_temp_amount } }
                                })];
                        case 29:
                            _a.sent();
                            return [3 /*break*/, 31];
                        case 30:
                            e_4 = _a.sent();
                            console.log("Error//: error while updating hive for sender" + e_4);
                            return [3 /*break*/, 31];
                        case 31:
                            _a.trys.push([31, 34, , 35]);
                            console.log("*//> Updateing Hive Data for reciver.");
                            return [4 /*yield*/, prisma.hiveSchema.findFirst({
                                    where: { walletid: _to }
                                })];
                        case 32:
                            hive_from_block = _a.sent();
                            hive_from_temp_amount = 0;
                            hive_from_temp_amount = hive_from_block === null || hive_from_block === void 0 ? void 0 : hive_from_block.amount;
                            if (hive_from_temp_amount === undefined) {
                                hive_from_temp_amount = 0;
                            }
                            return [4 /*yield*/, prisma.hiveSchema.updateMany({
                                    where: { walletid: _from },
                                    data: { amount: { set: hive_from_temp_amount } }
                                })];
                        case 33:
                            _a.sent();
                            return [3 /*break*/, 35];
                        case 34:
                            e_5 = _a.sent();
                            console.log("Error//: error while updating hive for reciver" + e_5);
                            return [3 /*break*/, 35];
                        case 35: return [4 /*yield*/, this.balance(_to)];
                        case 36:
                            _balance = _a.sent();
                            return [2 /*return*/, "Success TRNo" + trno + ", Balance: " + _balance];
                        case 37:
                            err_1 = _a.sent();
                            console.error("Error during create many data for vartix: " + err_1);
                            return [3 /*break*/, 38];
                        case 38: return [3 /*break*/, 40];
                        case 39:
                            err_2 = _a.sent();
                            console.error("Creat Hash Function error: " + err_2);
                            return [3 /*break*/, 40];
                        case 40: return [2 /*return*/];
                    }
                });
            });
        };
        // async WalletData(walletid: any, fromdate: any, todate: any) {
        //   try {
        //     const fmonth = fromdate.getMonth()
        //     const fday = fromdate.getDate()
        //     const fyear = fromdate.getFullYear()
        //     const tmonth = todate.getMonth()
        //     const tday = todate.getDate()
        //     const tyear = todate.getFullYear()
        //     const data = await prisma.vertixSchema.findMany({
        //       where: {
        //         walletid: walletid,
        //         timestamp: {
        //           gt: new Date(fyear, fmonth, fday),
        //           lt: new Date(tyear, tmonth, tday),
        //         },
        //       },
        //     })
        //     return data
        //   } catch (error) {
        //     return "Error"
        //   }
        // }
        this.mktrno = function () {
            return Date.now() + crypto_1["default"].randomInt(7);
        };
        this.revurce = function () {
            return true;
        };
        this.balance = function (walletid) { return __awaiter(_this, void 0, void 0, function () {
            var block, balance, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.vertixSchema.findMany({
                            where: { walletid: walletid }
                        })];
                    case 1:
                        block = _a.sent();
                        balance = 0;
                        for (i = 1; i < block.length; i++) {
                            balance = balance - block[i].debit;
                            balance = balance + block[i].credit;
                        }
                        console.log("Balance for ".concat(walletid, " : ") + balance);
                        return [2 /*return*/, balance];
                }
            });
        }); };
        /*
        Last function
        */
        this.statment = function (walletid) { return __awaiter(_this, void 0, void 0, function () {
            var block, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.vertixSchema.findMany({
                                select: {
                                    timestamp: true,
                                    debit: true,
                                    credit: true,
                                    transaction_no: true,
                                    edge_out: true,
                                    body: true
                                },
                                where: { walletid: walletid },
                                orderBy: {
                                    walletid: "desc"
                                }
                            })];
                    case 1:
                        block = _a.sent();
                        return [2 /*return*/, block];
                    case 2:
                        err_3 = _a.sent();
                        console.log("Error while geting lash hash", err_3);
                        return [2 /*return*/, "Error Last Hash " + err_3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.statment_period = function (walletid, from, to) { return __awaiter(_this, void 0, void 0, function () {
            var block, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.vertixSchema.findMany({
                                select: {
                                    timestamp: true,
                                    debit: true,
                                    credit: true,
                                    transaction_no: true,
                                    edge_out: true,
                                    body: true
                                },
                                where: {
                                    walletid: walletid,
                                    timestamp: {
                                        gte: from,
                                        lte: to
                                    }
                                },
                                orderBy: {
                                    walletid: "desc"
                                }
                            })];
                    case 1:
                        block = _a.sent();
                        console.log(block);
                        return [2 /*return*/, block];
                    case 2:
                        err_4 = _a.sent();
                        console.log("Error while geting lash hash", err_4);
                        return [2 /*return*/, "Error Last Hash " + err_4];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /*
        Last function
        */
        this.lastHash = function (walletid) { return __awaiter(_this, void 0, void 0, function () {
            var block, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, prisma.vertixSchema.findFirst({
                                where: { walletid: walletid },
                                orderBy: {
                                    walletid: "desc"
                                }
                            })];
                    case 1:
                        block = _a.sent();
                        if (!((block === null || block === void 0 ? void 0 : block.hash) == null || (block === null || block === void 0 ? void 0 : block.hash) == undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, prisma.hiveSchema.findFirst({
                                where: { walletid: walletid }
                            })];
                    case 2:
                        block = _a.sent();
                        return [2 /*return*/, block === null || block === void 0 ? void 0 : block.hash];
                    case 3: return [2 /*return*/, block === null || block === void 0 ? void 0 : block.hash];
                    case 4:
                        err_5 = _a.sent();
                        console.log("Error while geting lash hash", err_5);
                        return [2 /*return*/, "Error Last Hash " + err_5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        /*
        Sleep function
        */
        this.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
    }
    Vartix.prototype.look = function (walletid) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.vertixSchema.findMany({
                                select: {
                                    transaction_no: true,
                                    edge_in: true,
                                    edge_out: true,
                                    debit: true,
                                    credit: true,
                                    timestamp: true,
                                    body: true
                                },
                                where: { walletid: walletid },
                                orderBy: { timestamp: "asc" }
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, "Error looking for vartex transaction. Massage:" + error_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*
    Hash function
    */
    Vartix.prototype.V_hashing = function (walletid, ref, timestamp, amount, nodein, nodeout, body) {
        return new Promise(function (resolve, reject) {
            try {
                var _hashData = JSON.stringify(walletid + ref + timestamp + amount + nodein + nodeout + body);
                var hash_1 = crypto_1["default"].createHash("sha256");
                hash_1.on("readable", function () {
                    var data = hash_1.read();
                    if (data) {
                        resolve(data.toString("hex"));
                    }
                    else {
                        reject(new Error("Unable to create hash"));
                    }
                });
                hash_1.write(_hashData);
                hash_1.end();
            }
            catch (err) {
                console.log("Error while hasing", err);
                return "Error Hashing " + err;
            }
        });
    };
    return Vartix;
}());
exports["default"] = Vartix;
//# sourceMappingURL=Vartix.js.map