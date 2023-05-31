"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendinblue_transport_1 = __importDefault(require("nodemailer-sendinblue-transport"));
const envVariables_1 = __importDefault(require("../Environment/envVariables"));
// import { google } from "googleapis";
// const GOOGLE_ID =
//   "1077811658485-8g4oaik299dr0m2mk0pj17ojt885t5tn.apps.googleusercontent.com";
// const GOOGLE_SECRET = "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";
// const GOOGLE_REFRESHTOKEN =
//   "1//04Ub7et3W2PZ1CgYIARAAGAQSNwF-L9IrWC5IbvJUy0z7spBG5TjsIk0d8wWO-FF0AzTpHaw3HDwq2Br3bWeBvKrr38gWkTNPKrc";
// const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
// const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
// oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });
const Mailer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, messages, subject } = req.body;
    try {
        // const getAccessToken: any = (await oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport(new nodemailer_sendinblue_transport_1.default({
            apiKey: envVariables_1.default.send_in_blue,
        }));
        const message = {
            from: email,
            to: "Chy4real1982@gmail.com",
            subject: subject,
            html: messages,
        };
        transport.sendMail(message);
        return res.status(200).json({
            message: "successful",
        });
    }
    catch (error) {
        res.status(400).json({
            message: "An error occured",
            data: error.message,
        });
    }
});
exports.Mailer = Mailer;
//  service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "ogbonnafinbarr@gmail.com",
//     clientId: GOOGLE_ID,
//     clientSecret: GOOGLE_SECRET,
//     refreshToken: GOOGLE_REFRESHTOKEN,
//     accessToken:
//               "ya29.a0Ael9sCOzMhnXJziY5UJIXsacuxtVk2bMrosg_mHRy6M4EOU8z49KPTyNWBOMMAjt_3vl492NBBeZzZxUWolJs7USpY6V7RtIMItTtu_70-xttS7jrLS6FZgYlUyhesUtE2tCL5R0_WEXEYTbJ-INtwD4nftjaCgYKAaMSARESFQF4udJhqsSgHm2KTNTUkx7BTwYy9g0163",
//   },
