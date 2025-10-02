"use client";
import { Persona } from "@/lib/types/persona.types";
import { toast } from "sonner";
import CheckAnimation from "../CheckAnimation";

export async function getPersonas(userId: string): Promise<Persona[]> {
  const res = await fetch(`/api/persona?userId=${userId}`);
  const data = await res.json();

  if (!data.success) {
    toast.error("Failed to fetch personas");
    throw new Error(data?.message || "Failed to fetch personas");
  }
  toast(
    <div className=" flex items-center   gap-2">
      <CheckAnimation /> Personas fetched successfully
    </div>
  );
  console.log(data);
  return data.personas as Persona[];
}
