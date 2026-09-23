const client = require('.prisma/client/index.js');
const OriginalPrismaClient = client.PrismaClient;

client.PrismaClient = class PrismaClient extends OriginalPrismaClient {
  constructor(options) {
    console.log("Constructor options passed:", JSON.stringify(options));
    super(options);
  }
}

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const pool = new Pool({ connectionString: "postgresql://postgres:postgres@localhost:5432/thronova" });
const adapter = new PrismaPg(pool);

try {
  const prisma = new client.PrismaClient({ adapter, log: ['error'] });
  console.log("Success!");
} catch (e) {
  console.error("Error:", e);
}
