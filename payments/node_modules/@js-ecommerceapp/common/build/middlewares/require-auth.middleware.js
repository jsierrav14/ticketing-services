"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var no_authorized_error_1 = require("../errors/no-authorized.error");
exports.requireAuth = function (req, res, next) {
    if (!req.currentUser) {
        throw new no_authorized_error_1.NotAuthorizedError();
    }
    next();
};
