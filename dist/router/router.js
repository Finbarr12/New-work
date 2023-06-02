"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../Controller/AdminController");
const ProductController_1 = require("../Controller/ProductController");
const Multer_1 = __importDefault(require("../config/Multer"));
const Mailer_1 = require("../Controller/Mailer");
const router = (0, express_1.Router)();
router.post("/adminsignup", AdminController_1.SignUpAdmin);
router.post("/adminsignin", AdminController_1.SignInadmin);
router.post(
  "/createproduct",
  Multer_1.default,
  ProductController_1.CreateProducts
);
router.get("/products", ProductController_1.Allproducts);
router.post("/mailer", Mailer_1.Mailer);
router.delete("/delete/:id", ProductController_1.DeleteProduct);
// router.post("/forgotpass", AdminController_1.ForgotPassword);
// router.post("/resetpass", AdminController_1.ResetPasssword);
exports.default = router;
