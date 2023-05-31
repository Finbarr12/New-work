import { Request, Response } from "express";
import { Iproducts } from "../Interface/interface";
import ProductModel from "../Model/ProductModel";
import cloudinary from "../config/cloudinary";

export const CreateProducts = async (
  req: Request<{}, {}, Iproducts>,
  res: Response
) => {
  try {
    const { name, Image, Category, desc } = req.body;

    const CloudImg = await cloudinary.uploader.upload(req!.file!.path);

    const createProd = await ProductModel.create({
      name,
      Image: CloudImg!.secure_url,
      Category,
      desc,
    });

    return res.status(200).json({
      message: "created",
      data: createProd,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occured",
      data: error,
    });
  }
};

//Allproducts

export const Allproducts = async (req: Request, res: Response) => {
  try {
    const Products = await ProductModel.find().sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: "Products gotten",
      data: Products,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occured",
      data: error,
    });
  }
};

export const DeleteProduct = async (req: Request, res: Response) => {
  try {
    const Delpro = await ProductModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occured",
      data: error,
    });
  }
};
