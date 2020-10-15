"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'murylocesar2014@gmail.com',
      name: 'Murylo Cesar'
    }
  }
};
exports.default = _default;