import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  earlyAccess: true,
  migrations: {
    url: process.env.DATABASE_URL,
  },
  datasource: {
    url: process.env.DATABASE_URL,
  }
});
