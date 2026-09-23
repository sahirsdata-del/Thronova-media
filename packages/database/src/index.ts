import { PrismaClient } from ".prisma/client/index.js";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Global for development to prevent hot reload from creating multiple connections
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/thronova";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
  log: ['error']
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from ".prisma/client/index.js";
