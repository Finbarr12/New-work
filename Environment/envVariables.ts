import dotenv from "dotenv";

dotenv.config();

const EnvironmentVariables = {
  send_in_blue: process.env.send_in_blue,
  mongoliveuri: process.env.mongoliveuri as string,
};

export default EnvironmentVariables;
