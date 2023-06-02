"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./dist/config/db");
const router_1 = __importDefault(require("./dist/router/router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const Port = 1112;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", router_1.default);
(0, db_1.DBConnect)();
app.listen(Port, () => {
  console.log("Up and running");
});
