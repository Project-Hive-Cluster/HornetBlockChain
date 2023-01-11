#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/**
 * Module dependencies.
 */
var main_1 = __importDefault(require("../main"));
var http_1 = __importDefault(require("http"));
var debug_1 = __importDefault(require("debug"));
/**
 * Normalize a port into a number, string, or false.
 */
var normalizePort = function (val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "4000");
console.log("port: " + port);
main_1["default"].set("port", port);
/**
 * Create HTTP server.
 */
var server = http_1["default"].createServer(main_1["default"]);
/**
 * Event listener for HTTP server "error" event.
 */
var onError = function (error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
/**
 * Event listener for HTTP server "listening" event.
 */
var onListening = function () {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port ";
    (0, debug_1["default"])("Listening on " + bind);
};
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
//# sourceMappingURL=www.js.map