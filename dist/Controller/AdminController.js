"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasssword =
  exports.ForgotPassword =
  exports.SignInadmin =
  exports.SignUpAdmin =
    void 0;
const AdminModel_1 = __importDefault(require("../Model/AdminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendinblue_transport_1 = __importDefault(
  require("sendinblue-api")
);
const envVariables_1 = __importDefault(require("../Environment/envVariables"));
//signupadmin
const SignUpAdmin = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { name, password, email, confirmpassword } = req.body;
      const salt = yield bcrypt_1.default.genSalt(12);
      const hashedPass = yield bcrypt_1.default.hash(password, salt);
      const SignAdmin = yield AdminModel_1.default.create({
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
  });
exports.SignUpAdmin = SignUpAdmin;
//signinAdmin
const SignInadmin = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { email, password } = req.body;
      if (!email) {
        res.status(400).json({
          message: "Input email",
        });
      }
      const adminInfo = yield AdminModel_1.default.findOne({ email });
      if (!adminInfo) {
        res.status(400).json({
          message: "Email not found",
        });
      }
      const Checkpass = yield bcrypt_1.default.compare(
        password,
        adminInfo.password
      );
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
  });
exports.SignInadmin = SignInadmin;
const ForgotPassword = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { email } = req.body;
      const user = yield AdminModel_1.default.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      const pin = Math.floor(Math.random() * 900000) + 100000;
      user.passwordResetPin = pin;
      yield user.save();
      const transport = nodemailer_1.default.createTransport(
        new nodemailer_sendinblue_transport_1.default({
          apiKey: envVariables_1.default.send_in_blue,
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
        messge: `PIN sent to ${
          user === null || user === void 0 ? void 0 : user.email
        }`,
      });
    } catch (error) {
      return res.status(400).json({
        message: "An error occured",
        data: error,
      });
    }
  });
exports.ForgotPassword = ForgotPassword;
const ResetPasssword = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { email, pin, newPassword } = req.body;
      const user = yield AdminModel_1.default.findOne({
        email,
        passwordResetPin: pin,
      });
      if (!user) {
        return res.status(404).send({ message: "Invalid email or PIN" });
      }
      user.password = newPassword;
      user.confirmpassword = newPassword;
      user.passwordResetPin = undefined;
      yield user.save();
      res.send({ message: "Password reset successful" });
    } catch (error) {
      return res.status(400).json({
        message: "An error occured",
        data: error,
      });
    }
  });
exports.ResetPasssword = ResetPasssword;
