import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { userApikeys } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await db
    .update(userApikeys)
    .set({ revoked: true })
    .where(eq(userApikeys.id, id));
  return NextResponse.json({ success: true });
}
