import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      user_id,
      account_type,
      full_name,
      individual_phone,
      business_name,
      business_type,
      business_phone,
      address
    } = body;

    if (!user_id || !account_type) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Validate account type
    if (!["individual", "business"].includes(account_type)) {
      return NextResponse.json(
        { error: "Invalid account type." },
        { status: 400 }
      );
    }

    // Build dynamic update object
    const updateFields: any = {
      address
    };

    if (account_type === "individual") {
      updateFields.full_name = full_name;
      updateFields.individual_phone = individual_phone;
    }

    if (account_type === "business") {
      updateFields.business_name = business_name;
      updateFields.business_type = business_type;
      updateFields.business_phone = business_phone;
    }

    // Perform update
    await sql`
      UPDATE user_profile
      SET
        full_name = ${updateFields.full_name || null},
        individual_phone = ${updateFields.individual_phone || null},
        business_name = ${updateFields.business_name || null},
        business_type = ${updateFields.business_type || null},
        business_phone = ${updateFields.business_phone || null},
        address = ${updateFields.address || null},
        updated_at = NOW()
      WHERE user = ${user_id}
    `;

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully.",
        user_id
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Profile update error:", err);
    return NextResponse.json(
      { error: "Server error during profile update." },
      { status: 500 }
    );
  }
}
