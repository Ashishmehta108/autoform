import { and, eq } from "drizzle-orm";
import { db } from "../db/db";
import { persona } from "../db/schema";

export const UserResume = async (userId: string, personaId: string) => {
  const resumePath = await db
    .select({
      resumepath: persona.personauserdetaildocs,
    })
    .from(persona)
    .where(and(eq(persona.personaId, personaId), eq(persona.userId, userId)));

  const { resumepath } = resumePath[0];
  return resumepath;
};
