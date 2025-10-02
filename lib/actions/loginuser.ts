"use server";
import { signIn } from "@/auth";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import z from "zod";

const LoginUserViaEmailSchema = z.object({
  email: z.email(),
  image: z.string().optional().nullable(),
  password: z.string(),
});

export async function LoginViaEmail(
  data: z.infer<typeof LoginUserViaEmailSchema>
) {
  const parsed = LoginUserViaEmailSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const { password, email, image } = parsed.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existing = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, hashedPassword)));
  if (!existing) throw new Error("user doesnt exist");
  const signin = await signIn("credentials", {
    password: password,
    email: email,
    redirectTo: "/profile",
  });
}
