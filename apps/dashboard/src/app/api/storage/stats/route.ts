import { NextResponse } from "next/server";
import { storageService } from "@thronova/services";
import { prisma } from "@thronova/database";

export const dynamic = "force-dynamic";

// Convert BigInt to string before returning JSON
function serializeBigInts(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return obj.toString();
  if (Array.isArray(obj)) return obj.map(serializeBigInts);
  if (typeof obj === "object") {
    const serialized: any = {};
    for (const key in obj) {
      serialized[key] = serializeBigInts(obj[key]);
    }
    return serialized;
  }
  return obj;
}

export async function GET() {
  try {
    // 1. Get live disk usage
    const diskUsage = await storageService.getDiskUsage();

    // 2. Get largest files (Disk hogs)
    const largestFiles = await storageService.getLargestFiles(10);

    // 3. Get historical storage snapshots (last 30 entries)
    const snapshots = await prisma.storageSnapshot.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
    });

    // 4. Get recent cleanup logs
    const cleanupLogs = await prisma.cleanupLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const data = {
      diskUsage,
      largestFiles,
      snapshots: snapshots.reverse(),
      cleanupLogs,
    };

    return NextResponse.json({ success: true, data: serializeBigInts(data) });
  } catch (error: any) {
    console.error("Storage API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch storage stats" },
      { status: 500 }
    );
  }
}
