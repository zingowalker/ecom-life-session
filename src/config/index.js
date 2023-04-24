import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.port || 5000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/ecom"
}

export default config;