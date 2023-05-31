import mongoose from "mongoose";
import { Ireset } from "../Interface/interface";

interface Reset extends Ireset, mongoose.Document {}

const resetPasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  pin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Pin expires in 1 hour
  },
});

export default mongoose.model<Reset>("ResetPassword", resetPasswordSchema);
