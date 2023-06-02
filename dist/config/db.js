"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envVariables_1 = __importDefault(require("../Environment/envVariables"));
const Uri = envVariables_1.default.mongoliveuri;
const DBConnect = () => {
    try {
        const Connect = mongoose_1.default.connect(Uri);
        console.log(`You are connected to livedatabase`);
    }
    catch (error) {
        console.log(error);
    }
};
exports.DBConnect = DBConnect;
