"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, Edit, Trash2, Settings } from "lucide-react";
import { Persona } from "@/lib/types/persona.types";
import { EditPersonaModal as EditPersona } from "@/components/Persona/EditPersona";
import { DeletePersona } from "@/components/Persona/DeletePersona";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function PersonaCard({ persona }: { persona: Persona }) {
  const [openEdit, setOpenEdit] = useState(false);
  const description =
    typeof persona.personaDescription === "string"
      ? JSON.parse(persona.personaDescription)
      : persona.personaDescription;
  const { data, refetch } = useQuery({
    queryKey: ["personas", persona.userId],
    queryFn: async () => {
      const res = await fetch(`/api/persona?userId=${persona.userId}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to fetch personas");
      }
      toast.success("Personas  fetched successfully");
      return data.personas;
    },
  });
  const deletePersona = async () => {
    await DeletePersona(persona.userId, persona.personaId);
    refetch();
  };

  return (
    <div className="flex justify-center w-full">
      <Card
        className="
          relative w-full max-w-sm
          bg-neutral-50/90 dark:bg-neutral-900/80
          border border-neutral-200 dark:border-neutral-700
          rounded-2xl shadow-sm hover:shadow-md
          transition-all duration-300 group backdrop-blur-sm
           py-4
        "
      >
        <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_2px_8px_rgba(255,255,255,0.03)]" />
        <CardHeader className="flex items-center justify-between relative z-10 pb-4">
          <div className="flex items-center gap-4">
            <div
              className="
                w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800
                border border-neutral-200 dark:border-neutral-700
                flex items-center justify-center text-2xl font-semibold
                text-neutral-600 dark:text-neutral-300 overflow-hidden shadow-inner
              "
            >
              {persona.personaImage ? (
                <img
                  src={persona.personaImage}
                  alt={persona.username || ""}
                  className="w-full h-full object-cover"
                />
              ) : (
                persona.username?.[0]?.toUpperCase()
              )}
            </div>

            <div className="flex flex-col leading-snug">
              <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {persona.username}
              </CardTitle>
              <CardDescription className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                {description?.role || "No role specified"}
              </CardDescription>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="
              text-neutral-500 dark:text-neutral-400
              hover:text-neutral-700 dark:hover:text-neutral-200
              hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60
              opacity-0 group-hover:opacity-100 transition-opacity
              rounded-full
            "
          >
            <Settings className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6 text-sm text-neutral-700 dark:text-neutral-400">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4.5 h-4.5 text-neutral-400" />
              <span className="text-neutral-700 dark:text-neutral-300">
                {persona.personaEmail || "No email provided"}
              </span>
            </div>

            {description?.experience && (
              <div className="flex items-center gap-3">
                <Briefcase className="w-4.5 h-4.5 text-neutral-400" />
                <span className="text-neutral-700 dark:text-neutral-300">
                  {description.experience}
                </span>
              </div>
            )}
          </div>

          {description?.description && (
            <div className="space-y-2">
              <span className="block font-medium text-neutral-800 dark:text-neutral-200">
                Description
              </span>
              <div
                className="
                  max-h-28 overflow-y-auto
                  leading-relaxed tracking-wide
                  text-neutral-700 dark:text-neutral-400
                  bg-neutral-100/60 dark:bg-neutral-800/50
                  border border-neutral-200 dark:border-neutral-700
                  p-4 rounded-lg shadow-inner
                "
              >
                {description.description}
              </div>
            </div>
          )}

          {persona.addresses?.length ? (
            <div className="space-y-3">
              <span className="block font-medium text-neutral-800 dark:text-neutral-200">
                Addresses
              </span>
              <div className="space-y-3">
                {persona.addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="
                      p-3 border border-neutral-200 dark:border-neutral-700
                      rounded-lg bg-neutral-100/60 dark:bg-neutral-800/50
                      shadow-inner space-y-1.5
                    "
                  >
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {addr.type.charAt(0).toUpperCase() + addr.type.slice(1)}
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              size="sm"
              className="
                flex-1 min-w-[120px]
                bg-neutral-200/70 dark:bg-neutral-700/70
                hover:bg-neutral-300 dark:hover:bg-neutral-600
                text-neutral-800 dark:text-neutral-100 transition-colors
              "
            >
              Set Primary
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="
                border-neutral-300 dark:border-neutral-600
                text-neutral-600 dark:text-neutral-300
                hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors
              "
              onClick={() => setOpenEdit(true)}
            >
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="
                bg-red-500/90 hover:bg-red-600 text-white
                transition-colors
              "
              onClick={deletePersona}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditPersona
        persona={persona}
        open={openEdit}
        onOpenChange={setOpenEdit}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
}
