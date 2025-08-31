import imageApi from "@/features/images/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const { id, type } = await params;

  const data = await imageApi.fetchImagesData(type, id);
  return NextResponse.json(data);
}
