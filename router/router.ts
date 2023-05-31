import { Router } from "express";
import {
  ForgotPassword,
  ResetPasssword,
  SignInadmin,
  SignUpAdmin,
} from "../Controller/AdminController";
import {
  Allproducts,
  CreateProducts,
  DeleteProduct,
} from "../Controller/ProductController";
import ViewImage from "../config/Multer";
import { Mailer } from "../Controller/Mailer";

const router = Router();

router.post("/adminsignup", SignUpAdmin);
router.post("/adminsignin", SignInadmin);
router.post("/createproduct", ViewImage, CreateProducts);
router.get("/products", Allproducts);
router.post("/mailer", Mailer);
router.delete("/delete/:id", DeleteProduct);
router.post("/forgotpass", ForgotPassword);
router.post("/resetpass", ResetPasssword);
export default router;
