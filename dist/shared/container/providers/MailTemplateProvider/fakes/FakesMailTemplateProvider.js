"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakesMailTemplateProvider {
  async parse() {
    return 'Mail content';
  }

}

var _default = FakesMailTemplateProvider;
exports.default = _default;