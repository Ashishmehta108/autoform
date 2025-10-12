"use client";

import { Persona } from "@/lib/types/persona.types";
import { useEffect } from "react";
import { toast } from "sonner";
import CheckAnimation from "../CheckAnimation";

interface Props {
  personas: Persona[];
}

export default function PersonasClient({ personas }: Props) {
  useEffect(() => {
    if (personas.length > 0) {
      toast(
        <div className="flex items-center gap-2">
          <CheckAnimation /> Personas fetched successfully
        </div>
      );
    }
  }, [personas]);
}
