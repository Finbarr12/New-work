"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProduct = exports.Allproducts = exports.CreateProducts = void 0;
const ProductModel_1 = __importDefault(require("../Model/ProductModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const CreateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, Image, Category, desc } = req.body;
        const CloudImg = yield cloudinary_1.default.uploader.upload(req.file.path);
        const createProd = yield ProductModel_1.default.create({
            name,
            Image: CloudImg.secure_url,
            Category,
            desc,
        });
        return res.status(200).json({
            message: "created",
            data: createProd,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "an error occured",
            data: error,
        });
    }
});
exports.CreateProducts = CreateProducts;
//Allproducts
const Allproducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Products = yield ProductModel_1.default.find().sort({
            createdAt: -1,
        });
        return res.status(200).json({
            message: "Products gotten",
            data: Products,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "an error occured",
            data: error,
        });
    }
});
exports.Allproducts = Allproducts;
const DeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Delpro = yield ProductModel_1.default.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "an error occured",
            data: error,
        });
    }
});
exports.DeleteProduct = DeleteProduct;
