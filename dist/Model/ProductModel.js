"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("products", ProductSchema);
