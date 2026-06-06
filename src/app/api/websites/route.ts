import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, url } = body;  // ← FIXED

    // 1. Load user
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", userId)
      .executeTakeFirst();

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // 3. Create website
    const newSite = await db
      .insertInto("websites")
      .values({
        user_id: userId,
        url,
      })
      .returningAll()
      .executeTakeFirst();

    return Response.json(newSite);
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
