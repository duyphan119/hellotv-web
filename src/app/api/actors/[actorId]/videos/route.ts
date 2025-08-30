import actorApi from "@/features/actors/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ actorId: string }> }
) {
  const { actorId } = await params;

  const data = await actorApi.fetchVideosData(actorId);
  return NextResponse.json(data);
}
