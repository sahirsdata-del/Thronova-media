import { PrismaClient } from "@prisma/client";

// Global for development to prevent hot reload from creating multiple connections
const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient | undefined;

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!prismaInstance) {
      if (globalForPrisma.prisma) {
        prismaInstance = globalForPrisma.prisma;
      } else {
        prismaInstance = new PrismaClient();
        if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;
      }
    }
    return (prismaInstance as any)[prop];
  }
});

export * from "@prisma/client";
