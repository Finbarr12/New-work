"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// const upload = multer({
//   limits: {
//     fieldSize: 1024 * 1024, // Set the field size limit to 1MB
//   },
// });
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const ViewImage = (0, multer_1.default)({
    storage: storage,
    limits: { fieldSize: 1024 * 1024 },
}).single("Image");
exports.default = ViewImage;
