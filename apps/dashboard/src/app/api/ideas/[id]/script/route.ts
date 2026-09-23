import { NextResponse } from "next/server";
import { prisma } from "@thronova/database";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const scriptVersion = await prisma.scriptVersion.findFirst({
      where: { ideaId: id },
      orderBy: { versionNumber: 'desc' },
    });

    if (!scriptVersion) {
      return NextResponse.json({ error: "Script not found" }, { status: 404 });
    }

    return NextResponse.json({ script: scriptVersion });
  } catch (error: any) {
    console.error("GET /api/ideas/[id]/script error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
