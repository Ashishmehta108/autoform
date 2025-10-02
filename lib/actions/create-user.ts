"use server";

import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const createUserViaEmailSchema = z.object({
  email: z.email(),
  image: z.string().optional().nullable(),
  password: z.string(),
});

export async function createUserViaEmailAction(
  data: z.infer<typeof createUserViaEmailSchema>
) {
  const parsed = createUserViaEmailSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const { password, email, image } = parsed.data;

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const id = randomUUID();
  const name = email.split("@")[0];

  await db.insert(users).values({
    id,
    name,
    email,
    image,
    password: hashedPassword,
  });
  // await signin
}
