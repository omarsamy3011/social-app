"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
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
    },
    friends: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'user'
        }],
    friendrequests: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'user'
        }],
    groups: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'chat'
        }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
userSchema.virtual('userName').set(function (userName) {
    let [firstName, lastName] = userName.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
}).get(function () {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});
const userModel = mongoose_1.default.model('user', userSchema);
exports.default = userModel;
