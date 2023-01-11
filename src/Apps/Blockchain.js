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
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var crypto_1 = require("crypto");
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        var _this = this;
        this.initialize = function () { return __awaiter(_this, void 0, void 0, function () {
            var date, timestamp, _a, publicKey, privateKey, _password, genesisBlock, _body, err_1, error, propertyNames, descriptor, property, i, len, err_2, error, propertyNames, descriptor, property, i, len;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        date = new Date();
                        timestamp = date.toString();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, this.generateKeyPair()];
                    case 2:
                        _a = _b.sent(), publicKey = _a[0], privateKey = _a[1];
                        _password = crypto_1["default"]
                            .createHash("sha256")
                            .update("hornet")
                            .digest("hex");
                        genesisBlock = {};
                        _body = JSON.stringify({
                            Titel: "Genesis",
                            Data: "Genesis Block",
                            Auther: "Tanbin Hassan Bappi"
                        });
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, , 9]);
                        if (!(privateKey || privateKey)) return [3 /*break*/, 6];
                        return [4 /*yield*/, prisma.hiveSchema.create({
                                data: {
                                    walletkey: privateKey,
                                    timestamp: timestamp,
                                    ref: "genesis",
                                    hash: "genesis block",
                                    body: _body,
                                    amount: 0,
                                    signatue: "Invalid signature",
                                    owner: {
                                        create: {
                                            key: publicKey,
                                            firstname: "Haxrei",
                                            lastname: "Genesis",
                                            email: "hivecluster@haxrei.com",
                                            contact: "+8801611774234",
                                            password: _password,
                                            status: "active",
                                            wallet: "0000000000000000"
                                        }
                                    }
                                }
                            })];
                    case 4:
                        genesisBlock = _b.sent();
                        return [4 /*yield*/, prisma.$disconnect()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, genesisBlock];
                    case 6: return [2 /*return*/, { Error: "PrivateKey or PrivateKey missing" }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_1 = _b.sent();
                        console.error("Error updating Blockchain initialize: ", err_1);
                        error = new Error(err_1);
                        propertyNames = Object.getOwnPropertyNames(error);
                        descriptor = void 0;
                        for (property = void 0, i = 0, len = propertyNames.length; i < len; ++i) {
                            property = propertyNames[i];
                            descriptor = Object.getOwnPropertyDescriptor(error, property);
                            console.log(property, descriptor);
                        }
                        return [2 /*return*/, JSON.stringify(descriptor)];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        err_2 = _b.sent();
                        console.error("Error in Blockchain Initialize: ", err_2);
                        error = new Error(err_2);
                        propertyNames = Object.getOwnPropertyNames(error);
                        descriptor = void 0;
                        for (property = void 0, i = 0, len = propertyNames.length; i < len; ++i) {
                            property = propertyNames[i];
                            descriptor = Object.getOwnPropertyDescriptor(error, property);
                            console.log(property, descriptor);
                        }
                        return [2 /*return*/, JSON.stringify(descriptor)];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        /*  Block Ganarator*/
        this.create = function (_a) {
            var _firstname = _a._firstname, _lastname = _a._lastname, _email = _a._email, _contact = _a._contact, _password = _a._password, _b = _a._body, _body = _b === void 0 ? undefined : _b;
            return __awaiter(_this, void 0, void 0, function () {
                var verification, date, timestamp, walletid, pre_block, _Hash, refBlock, _c, publicKey, privateKey, Block, temp_walletid, e_1, password, e_2, err_3, err_4;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 17, , 18]);
                            return [4 /*yield*/, this.validateChain()
                                /*   Unable to fix chain intagnaty so off for now*/
                                // if (verification != true) {
                                //   return verification
                                // }
                                /*  Initialize Depanded variable */
                            ];
                        case 1:
                            verification = _d.sent();
                            date = new Date();
                            timestamp = date.toString();
                            walletid = undefined;
                            pre_block = undefined;
                            _Hash = undefined;
                            refBlock = undefined;
                            return [4 /*yield*/, this.generateKeyPair()
                                /* Key took time something JS not giving there for we make it wait */
                                // await this.sleep(1000) //3000ms = 3 seconds
                            ];
                        case 2:
                            _c = _d.sent(), publicKey = _c[0], privateKey = _c[1];
                            Block = {};
                            _d.label = 3;
                        case 3:
                            _d.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, prisma.hiveSchema.findFirst({
                                    distinct: ["walletid"],
                                    orderBy: {
                                        walletid: "desc"
                                    }
                                })];
                        case 4:
                            pre_block = _d.sent();
                            temp_walletid = pre_block.walletid;
                            if (temp_walletid.toString() === "0000000000000000") {
                                walletid = "1778500000000001";
                                refBlock = pre_block.hash;
                            }
                            else {
                                temp_walletid = parseInt(temp_walletid);
                                temp_walletid = temp_walletid + 1;
                                walletid = temp_walletid.toString();
                                refBlock = pre_block.hash;
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _d.sent();
                            return [2 /*return*/, "Error creating walletid" + e_1];
                        case 6:
                            password = "";
                            _d.label = 7;
                        case 7:
                            _d.trys.push([7, 9, , 10]);
                            return [4 /*yield*/, this.hashing(walletid, refBlock, timestamp, _body)];
                        case 8:
                            _Hash = _d.sent();
                            password = crypto_1["default"].createHash("sha256").update(_password).digest("hex");
                            return [3 /*break*/, 10];
                        case 9:
                            e_2 = _d.sent();
                            return [2 /*return*/, "Error creating Hash: " + e_2];
                        case 10:
                            _d.trys.push([10, 15, , 16]);
                            if (!(privateKey || privateKey)) return [3 /*break*/, 13];
                            return [4 /*yield*/, prisma.hiveSchema.create({
                                    data: {
                                        walletkey: privateKey,
                                        timestamp: timestamp,
                                        ref: refBlock,
                                        hash: _Hash,
                                        body: _body,
                                        amount: 0,
                                        signatue: undefined,
                                        owner: {
                                            create: {
                                                key: publicKey,
                                                firstname: _firstname,
                                                lastname: _lastname,
                                                email: _email,
                                                contact: _contact,
                                                password: password,
                                                plane_passwd: _password,
                                                status: "A",
                                                wallet: walletid
                                            }
                                        }
                                    }
                                })];
                        case 11:
                            Block = _d.sent();
                            return [4 /*yield*/, prisma.$disconnect()];
                        case 12:
                            _d.sent();
                            return [2 /*return*/, Block];
                        case 13: return [2 /*return*/, { Error: "PrivateKey or PrivateKey missing" }];
                        case 14: return [3 /*break*/, 16];
                        case 15:
                            err_3 = _d.sent();
                            console.error(err_3);
                            return [3 /*break*/, 16];
                        case 16: return [3 /*break*/, 18];
                        case 17:
                            err_4 = _d.sent();
                            console.error("Creat Hash Function error: " + err_4);
                            return [3 /*break*/, 18];
                        case 18: return [2 /*return*/];
                    }
                });
            });
        };
        this.validateChain = function () { return __awaiter(_this, void 0, void 0, function () {
            var chain, i, currentBlock, previousBlock, calculateBlockHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.hiveSchema.findMany()];
                    case 1:
                        chain = _a.sent();
                        i = 1;
                        _a.label = 2;
                    case 2:
                        if (!(i < chain.length)) return [3 /*break*/, 5];
                        currentBlock = chain[i];
                        previousBlock = chain[i - 1];
                        // Verify that the previous block hash stored in the current block
                        // matches the actual hash of the previous block
                        // console.log('currentBlock.ref', currentBlock.ref)
                        // console.log('previousBlock.hash', previousBlock.hash)
                        if (currentBlock.ref !== previousBlock.hash) {
                            return [2 /*return*/, "Chain is invalid: Current block and reference block do not match"];
                        }
                        return [4 /*yield*/, this.hashing(currentBlock.walletid, previousBlock.hash, currentBlock.timestamp, currentBlock.body)];
                    case 3:
                        calculateBlockHash = _a.sent();
                        if (currentBlock.hash !== calculateBlockHash) {
                            return [2 /*return*/, "Chain is invalid. Current block Hash do not match. Error Block ".concat(currentBlock.walletid)];
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, true];
                }
            });
        }); };
        this.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
    }
    BlockChain.prototype.generateKeyPair = function () {
        return new Promise(function (resolve, reject) {
            var options = {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: "spki",
                    format: "pem"
                },
                privateKeyEncoding: {
                    type: "pkcs8",
                    format: "pem"
                }
            };
            crypto_1["default"].generateKeyPair("rsa", options, function (err, publicKey, privateKey) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve([publicKey, privateKey]);
                }
            });
        });
    };
    BlockChain.prototype.hashing = function (walletid, ref, timestamp, body) {
        return new Promise(function (resolve, reject) {
            var _hashData = JSON.stringify(walletid + ref + timestamp + body);
            var hash = crypto_1["default"].createHash("sha256");
            hash.on("readable", function () {
                var data = hash.read();
                if (data) {
                    resolve(data.toString("hex"));
                }
                else {
                    reject(new Error("Unable to create hash"));
                }
            });
            hash.write(_hashData);
            hash.end();
        });
    };
    BlockChain.prototype.hiveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.hiveSchema.findMany({
                            select: {
                                id: true,
                                walletid: true,
                                timestamp: true,
                                amount: true,
                                body: true,
                                owner: true,
                                signatue: true
                            },
                            orderBy: {
                                id: "desc"
                            }
                        })];
                    case 1:
                        tempData = _a.sent();
                        return [4 /*yield*/, prisma.$disconnect];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, tempData];
                }
            });
        });
    };
    return BlockChain;
}());
exports["default"] = BlockChain;
