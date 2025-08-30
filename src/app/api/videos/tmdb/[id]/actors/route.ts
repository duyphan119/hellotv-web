import actorApi from "@/features/actors/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await actorApi.fetchActorsData(id);
  return NextResponse.json(data);
}
