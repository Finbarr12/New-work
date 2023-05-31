import mongoose, { Connection } from "mongoose";
import EnvironmentVariables from "../Environment/envVariables";

const Uri = EnvironmentVariables.mongoliveuri;

export const DBConnect = () => {
  try {
    const Connect = mongoose.connect(Uri);
    console.log(`You are connected to livedatabase`);
  } catch (error) {
    console.log(error);
  }
};
