import { EnvConfig } from "@thronova/config";
import { NextResponse } from "next/server";
import { analyticsService, performanceService } from "@thronova/services";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // In production, we should secure this endpoint using a secret token
    const authHeader = request.headers.get("authorization");
    
    // For Vercel Cron, they pass a bearer token
    if (EnvConfig.NODE_ENV === "production" && authHeader !== `Bearer ${EnvConfig.CRON_SECRET}`) {
       // return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await analyticsService.syncDailyAnalytics();
    
    // Trigger AI Performance evaluation on newly synced data
    await performanceService.evaluateRecentVideos();
    
    return NextResponse.json({ 
      success: true, 
      message: "Daily analytics sync completed",
      data: result 
    });
    
  } catch (error: any) {
    console.error("[Cron Analytics Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
