import multer from "multer";
import { Request } from "express";

type DestinationCallBack = (Error: Error | null, Destination: string) => void;
type FileDesCallBack = (Error: Error | null, Destination: string) => void;

// const upload = multer({
//   limits: {
//     fieldSize: 1024 * 1024, // Set the field size limit to 1MB
//   },
// });

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallBack
  ) => {
    cb(null, "uploads");
  },

  filename: (req: Request, file: Express.Multer.File, cb: FileDesCallBack) => {
    cb(null, file.originalname);
  },
});

const ViewImage = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 },
}).single("Image");

export default ViewImage;
