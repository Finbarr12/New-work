import mongoose from "mongoose";
import AdminModel from "../Model/AdminModel";
import { Request, Response } from "express";
import { Iadmin } from "../Interface/interface";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import sendInBlueTransport from "nodemailer-sendinblue-transport";
import EnvironmentVariables from "../Environment/envVariables";

//signupadmin

export const SignUpAdmin = async (
  req: Request<{}, {}, Iadmin>,
  res: Response
) => {
  try {
    const { name, password, email, confirmpassword } = req.body;

    const salt = await bcrypt.genSalt(12);

    const hashedPass = await bcrypt.hash(password, salt);

    const SignAdmin = await AdminModel.create({
      name,
      password: hashedPass,
      email,
      confirmpassword: hashedPass,
    });

    return res.status(201).json({
      message: "done",
      data: SignAdmin,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured",
      data: error,
    });
  }
};

//signinAdmin

export const SignInadmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({
        message: "Input email",
      });
    }

    const adminInfo = await AdminModel.findOne({ email });

    if (!adminInfo) {
      res.status(400).json({
        message: "Email not found",
      });
    }

    const Checkpass = await bcrypt.compare(password, adminInfo!.password);

    if (!Checkpass) {
      return res.status(404).json({
        message: "User dosen't exist",
      });
    }

    return res.status(200).json({
      status: "success",
      data: adminInfo,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured",
      data: error,
    });
  }
};

export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await AdminModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const pin = Math.floor(Math.random() * 900000) + 100000;

    user.passwordResetPin = pin;
    await user.save();

    const transport = nodemailer.createTransport(
      new sendInBlueTransport({
        apiKey: EnvironmentVariables.send_in_blue,
      })
    );

    const sendEmail = {
      from: "stsixtus12@gmail.com",
      to: user.email,
      subject: "Password reset PIN",
      html: `Your password reset PIN is: <h3>${pin}</h3>`,
    };

    transport.sendMail(sendEmail);

    res.status(200).json({
      messge: `PIN sent to ${user?.email}`,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured",
      data: error,
    });
  }
};

export const ResetPasssword = async (req: Request, res: Response) => {
  try {
    const { email, pin, newPassword } = req.body;

    const user = await AdminModel.findOne({ email, passwordResetPin: pin });

    if (!user) {
      return res.status(404).send({ message: "Invalid email or PIN" });
    }

    user.password = newPassword;
    user.confirmpassword = newPassword;
    user.passwordResetPin = undefined;
    await user.save();

    res.send({ message: "Password reset successful" });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured",
      data: error,
    });
  }
};
