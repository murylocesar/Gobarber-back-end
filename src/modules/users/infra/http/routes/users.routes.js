"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var celebrate_1 = require("celebrate");
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var UserCreateController_1 = __importDefault(require("../controller/UserCreateController"));
var UserAvatarController_1 = __importDefault(require("../controller/UserAvatarController"));
var usersRouter = express_1.Router();
var upload = multer_1.default(upload_1.default.multer);
var userAvatarController = new UserAvatarController_1.default();
var userController = new UserCreateController_1.default();
usersRouter.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
    _a)), userController.create);
usersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), userAvatarController.update);
exports.default = usersRouter;
