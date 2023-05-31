// import mongoose from "mongoose";
// import AdminModel from "../Model/AdminModel";
// import { Request, Response } from "express";
// import ResetPass from "../Model/ResetPass";
// import nodemailer from "nodemailer";
// import sendInBlueTransport from "nodemailer-sendinblue-transport";
// import EnvironmentVariables from "../Environment/envVariables";

// export const ForgotPassword = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;
//     const user = await AdminModel.findOne({ email });

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     const pin = Math.floor(Math.random() * 900000) + 100000;

//       const resetPassword = new ResetPass({
//         userId: user._id,
//         pin,
//       });
//     await user.save();

//     const transport = nodemailer.createTransport(
//       new sendInBlueTransport({
//         apiKey: EnvironmentVariables.send_in_blue,
//       })
//     );

//     const sendEmail = {
//       from: "stsixtus12@gmail.com",
//       to: user.email,
//       subject: "Password reset PIN",
//       html: `Your password reset PIN is: <h3>${pin}</h3>`,
//     };

//     transport.sendMail(sendEmail);

//     res.status(200).json({
//       messge: `PIN sent to ${user?.name}`,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: "An error occured",
//       data: error,
//     });
//   }
// };
