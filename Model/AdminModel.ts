import mongoose from "mongoose";
import { Iadmin } from "../Interface/interface";

interface Admin extends Iadmin, mongoose.Document {}

const AdminSchema = new mongoose.Schema<Iadmin>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  passwordResetPin: {
    type: Number,
  },
});

export default mongoose.model<Admin>("admindb", AdminSchema);
