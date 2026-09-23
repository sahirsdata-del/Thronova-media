import { NextResponse } from "next/server";
import { prisma } from "@thronova/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const runtime = "nodejs";

async function getOrCreateProject() {
  const session = await getServerSession(authOptions);
  let userId = session?.user?.id;
  
  if (!userId) {
    // Fallback for local testing when unauthenticated
    let defaultUser = await prisma.user.findUnique({ where: { email: "local@thronova.test" } });
    if (!defaultUser) {
      defaultUser = await prisma.user.create({
        data: {
          email: "local@thronova.test",
          name: "Local Tester",
        }
      });
    }
    userId = defaultUser.id;
  }

  let project = await prisma.project.findFirst({
    where: { userId }
  });

  if (!project) {
    project = await prisma.project.create({
      data: {
        name: "My First Project",
        userId,
      }
    });
  }

  return project;
}

export async function GET() {
  try {
    const project = await getOrCreateProject();
    
    const ideas = await prisma.contentIdea.findMany({
      where: { projectId: project.id },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ ideas });
  } catch (error: any) {
    console.error("GET /api/ideas error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, category, priority } = await req.json();
    const project = await getOrCreateProject();

    if (!title || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const idea = await prisma.contentIdea.create({
      data: {
        title,
        category,
        priority: priority || "MEDIUM",
        status: "DRAFT",
        projectId: project.id,
      }
    });

    return NextResponse.json({ success: true, idea });
  } catch (error: any) {
    console.error("POST /api/ideas error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
