import imageApi from "@/features/images/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await imageApi.fetchImagesData(id);
  return NextResponse.json(data);
}
