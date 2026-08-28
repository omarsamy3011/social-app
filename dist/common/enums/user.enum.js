"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleEnum = exports.providerEnum = exports.genderEnum = void 0;
var genderEnum;
(function (genderEnum) {
    genderEnum[genderEnum["Male"] = 0] = "Male";
    genderEnum[genderEnum["Female"] = 1] = "Female";
})(genderEnum || (exports.genderEnum = genderEnum = {}));
var providerEnum;
(function (providerEnum) {
    providerEnum[providerEnum["System"] = 0] = "System";
    providerEnum[providerEnum["Gmail"] = 1] = "Gmail";
})(providerEnum || (exports.providerEnum = providerEnum = {}));
var roleEnum;
(function (roleEnum) {
    roleEnum[roleEnum["user"] = 0] = "user";
    roleEnum[roleEnum["admin"] = 1] = "admin";
})(roleEnum || (exports.roleEnum = roleEnum = {}));
