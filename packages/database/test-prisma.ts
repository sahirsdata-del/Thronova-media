import { PrismaClient } from "@prisma/client";

try {
  const p = new PrismaClient({ engineType: "library" } as any);
  console.log("Success");
} catch (e) {
  console.error(e);
}
