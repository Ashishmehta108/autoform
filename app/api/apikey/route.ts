import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { v4 as uuid } from "uuid";
import { userApikeys } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json([], { status: 400 });

  const keys = await db
    .select()
    .from(userApikeys)
    .where(eq(userApikeys.userId, userId));

  return NextResponse.json(keys);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = body;

  if (!userId)
    return NextResponse.json({ error: "userId required" }, { status: 400 });

  // Prevent multiple keys per user
  const existingKeys = await db
    .select()
    .from(userApikeys)
    .where(eq(userApikeys.userId, userId));

  if (existingKeys.length > 0) {
    return NextResponse.json(
      { error: "You already have an API key" },
      { status: 400 }
    );
  }

  const newKey = {
    id: uuid(),
    userId,
    dailyLimit: 3,
    revoked: false,
    dailyUsageCount: 0,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  };

  await db.insert(userApikeys).values(newKey);
  return NextResponse.json(newKey);
}
