import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  console.log("Verification request received:", body);

  return NextResponse.json({
    success: true,
    message: "Verification endpoint reached.",
  });
}
