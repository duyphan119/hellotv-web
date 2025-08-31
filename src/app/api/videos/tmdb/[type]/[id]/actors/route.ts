import actorApi from "@/features/actors/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const { id, type } = await params;

  const data = await actorApi.fetchActorsData(type, id);
  return NextResponse.json(data);
}
