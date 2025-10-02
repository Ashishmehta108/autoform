import { db } from "../db/db";
import { persona } from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { CreatePersonaInput, UpdatePersonaInput } from "../types/persona.types";

export const createPersona = async ({
  personaName,
  userId,
  username,
  personaEmail,
  personaImage,
  personaDescription,
  personauserdetaildocs,
  addresses
}: CreatePersonaInput) => {
  if (!personaName || !userId) {
    throw new Error("personaId, personaName, and userId are required");
  }

  try {
    const personaId = await randomUUID();
    const result = await db.insert(persona).values({
      personaId,
      personaName,
      userId,
      username,
      personaEmail,
      personaImage,
      personaDescription,
      personauserdetaildocs,
      addresses
    });
    return { success: true, result };
  } catch (error) {
    console.error("Failed to create persona:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const updatePersona = async ({
  personaId,
  ...updateFields
}: UpdatePersonaInput) => {
  if (!personaId) {
    throw new Error("personaId is required for updating");
  }
  try {
    const result = await db
      .update(persona)
      .set(updateFields)
      .where(eq(persona.personaId, personaId));
    return { success: true, result };
  } catch (error) {
    console.error("Failed to update persona:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const deletePersona = async (personaId: string, userId: string) => {
  console.log(personaId);
  if (!personaId) {
    throw new Error("personaId is required to delete persona");
  }
  try {
    const result = await db
      .delete(persona)
      .where(and(eq(persona.personaId, personaId), eq(persona.userId, userId)));
    return { success: true, result };
  } catch (error) {
    console.error("Failed to delete persona:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const getAllPersona = async (userId: string) => {
  if (!userId) throw new Error("userId is required");

  try {
    const personas = await db
      .select()
      .from(persona)
      .where(eq(persona.userId, userId));

    return { success: true, personas };
  } catch (error) {
    console.error("Error fetching personas:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const getSpecificPersona = async (userId: string, personaId: string) => {
  if (!userId || !personaId)
    throw new Error("userId and personaId are required");
  try {
    const [personaData] = await db
      .select()
      .from(persona)
      .where(eq(persona.userId, userId) && eq(persona.personaId, personaId));

    if (!personaData) {
      return { success: false, error: "Persona not found or access denied" };
    }
    return { success: true, persona: personaData };
  } catch (error) {
    console.error("Error fetching specific persona:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
