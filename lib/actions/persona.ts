"use server";

import { db } from "../db/db";
import { persona, personaReqs } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { CreatePersonaInput, UpdatePersonaInput } from "../types/persona.types";
import { v4 as uuid } from "uuid";

export const createPersona = async ({
  personaName,
  userId,
  username,
  phoneNumber,
  personaImage,
  description,
  summary,
  addresses,
  education,
  workExperience,
  projects,
  skills,
  interests,
  hobbies,
  languages,
  gender,
  nationality,
  socialProfiles,
}: CreatePersonaInput) => {
  if (!personaName || !userId) {
    throw new Error("personaName and userId are required");
  }

  try {
    const personaId = uuid();

    const [result] = await db
      .insert(persona)
      .values({
        personaId,
        personaName,
        userId,
        username,
        phoneNumber,
        personaImage,
        description,
        summary,
        addresses,
        education,
        workExperience,
        projects,
        skills,
        interests,
        hobbies,
        languages,
        gender,
        nationality,
        socialProfiles,
      })
      .returning();

    console.log("✅ Persona created with ID:", personaId);
    return { success: true, result, personaId };
  } catch (error) {
    console.error("❌ Failed to create persona:", error);
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
  if (!personaId) throw new Error("personaId is required for updating");

  try {
    const [updated] = await db
      .update(persona)
      .set({
        ...updateFields,
        updatedAt: new Date(),
      })
      .where(eq(persona.personaId, personaId))
      .returning();

    return { success: true, updated };
  } catch (error) {
    console.error("❌ Failed to update persona:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const deletePersona = async (personaId: string, userId: string) => {
  if (!personaId) throw new Error("personaId is required to delete persona");

  try {
    const result = await db
      .delete(persona)
      .where(and(eq(persona.personaId, personaId), eq(persona.userId, userId)));

    return { success: true, result };
  } catch (error) {
    console.error("❌ Failed to delete persona:", error);
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
    console.error("❌ Error fetching personas:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      personas: [],
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
      .where(and(eq(persona.userId, userId), eq(persona.personaId, personaId)));

    if (!personaData)
      return { success: false, error: "Persona not found or access denied" };

    return { success: true, persona: personaData };
  } catch (error) {
    console.error(" Error fetching specific persona:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export async function createRequest(personaId: string) {
  try {
    const requestId = uuid();

    const [data] = await db
      .insert(personaReqs)
      .values({ requestId, personaId })
      .returning();

    if (!data) throw new Error("Couldn't create request. Try again later.");

    console.log(" Request created:", data);
    return requestId;
  } catch (error) {
    console.error("❌ Failed to create request:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
