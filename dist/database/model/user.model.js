"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("../../common");
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    password: String,
    confirmPassword: String,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    profilepic: {
        type: [String]
    },
    gender: {
        type: Number,
        default: common_1.genderEnum.Male
    },
    role: {
        type: Number,
        default: common_1.roleEnum.user
    },
    provider: {
        type: Number,
        default: common_1.providerEnum.System
    }
}, {
    timestamps: true
});
userSchema.virtual('userName').set(function (userName) {
    let [firstName, lastName] = userName.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
}).get(function () {
    return `${this.firstName} ${this.lastName}`;
});
const userModel = mongoose_1.default.model('user', userSchema);
exports.default = userModel;
