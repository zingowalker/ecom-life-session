import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.port || 5000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/ecom",
  JWT_SECRET: process.env.JWT_SECRET || "password@#202303",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "15d",
}

export default config;