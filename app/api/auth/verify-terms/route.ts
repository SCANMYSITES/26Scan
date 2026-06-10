import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    console.log("Received verification code:", code);

    // Temporary test logic
    if (code === "123456") {
      return NextResponse.json({
        success: true,
        message: "Verification successful. Proceed to Terms & Conditions.",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid code. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json(
      { success: false, message: "Server error during verification." },
      { status: 500 }
    );
  }
}
