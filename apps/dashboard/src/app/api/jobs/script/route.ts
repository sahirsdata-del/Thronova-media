import { NextResponse } from "next/server";
import { Queue } from "bullmq";
import { QUEUES } from "@thronova/constants";
import { connection } from "@thronova/shared";

const scriptQueue = new Queue(QUEUES.SCRIPT, { connection: connection as any });

export async function POST(req: Request) {
  try {
    const { ideaId, title, category } = await req.json();

    if (!ideaId || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const job = await scriptQueue.add('generate', {
      ideaId,
      title,
      category,
    });

    return NextResponse.json({ success: true, jobId: job.id });
  } catch (error: any) {
    console.error("Failed to enqueue script job:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
