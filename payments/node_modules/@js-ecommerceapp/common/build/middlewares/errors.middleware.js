"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var custon_error_1 = require("../errors/custon-error");
exports.errorHandler = function (err, req, res, next) {
    if (err instanceof custon_error_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    res.status(400).send({
        errors: [
            {
                message: 'something went wrong'
            }
        ]
    });
};
