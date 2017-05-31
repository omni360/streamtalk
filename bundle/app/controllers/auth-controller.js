"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
var StreamTalk_1 = require("StreamTalk");
var jsonwebtoken_1 = require("jsonwebtoken");
var logger_1 = require("../../config/logger");
var AuthController = (function () {
    function AuthController(config, logProvider) {
        this.config = config;
        this.logger = logProvider.factory(logger_1.stdoutLogger);
    }
    AuthController.prototype.initialize = function (options) {
        var opts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
            secretOrKey: this.config.secretKey
        };
        passport.use('jwt', new passport_jwt_1.Strategy(opts, function (payload, done) {
            done(undefined, true);
        }));
        return passport.initialize();
    };
    AuthController.prototype.extractJwt = function (req) {
        var jwt = passport_jwt_1.ExtractJwt.fromAuthHeader()(req);
        return jwt;
    };
    AuthController.prototype.authenticate = function () {
        return passport.authenticate('jwt', { session: false });
    };
    AuthController.prototype.authorize = function (req, res, next) {
        var auth = req.authorization.basic;
        var username = auth.username, password = auth.password;
        this.logger.info({ user: auth });
        if (username === 'validusername' && password === 'validpassword') {
            var signOptions = {};
            var token = jsonwebtoken_1.sign({ user: 'validuser' }, this.config.secretKey, signOptions);
            res.send(200, token);
            next();
        }
        else {
            res.send(401);
            next();
        }
    };
    return AuthController;
}());
AuthController = __decorate([
    StreamTalk_1.IOC.Resolve,
    StreamTalk_1.Decorators.Controller,
    __param(0, StreamTalk_1.IOC.Inject),
    __param(1, StreamTalk_1.IOC.Inject),
    __metadata("design:paramtypes", [StreamTalk_1.Types.ServerConfig, StreamTalk_1.LogProvider])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth-controller.js.map