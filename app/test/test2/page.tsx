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

export default function PersonaCard({ persona }: { persona: Persona }) {
  const [openEdit, setOpenEdit] = useState(false);
  const description =
    typeof persona.personaDescription === "string"
      ? JSON.parse(persona.personaDescription)
      : persona.personaDescription;

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <Card className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
        <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_2px_6px_rgba(255,255,255,0.03)]" />

        <CardHeader className="flex items-center justify-between relative z-10 pb-3">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xl font-semibold text-neutral-600 dark:text-neutral-300 overflow-hidden">
              {persona.personaImage ? (
                <img
                  src={persona.personaImage}
                  alt={persona.username || ""}
                  className="w-16 h-16 object-cover"
                />
              ) : (
                persona.username?.[0]?.toUpperCase()
              )}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                {persona.username}
              </CardTitle>
              <CardDescription className="text-sm text-neutral-400 dark:text-neutral-400">
                {description?.role || "No role specified"}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="pt-0 relative z-10 space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-neutral-400" />
            <span>{persona.personaEmail}</span>
          </div>

          {description?.experience && (
            <div className="flex items-center space-x-3">
              <Briefcase className="w-4 h-4 text-neutral-400" />
              <span>{description.experience}</span>
            </div>
          )}

          {description?.description && (
            <>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Description
              </span>
              <div className="h-28 overflow-y-auto text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-700 p-3 rounded-lg">
                {description.description}
              </div>
            </>
          )}

          {persona.addresses && persona.addresses.length > 0 && (
            <div>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Addresses
              </span>
              <div className="space-y-2 mt-2">
                {persona.addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="p-2 border border-neutral-200 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-800"
                  >
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {addr.type.charAt(0).toUpperCase() + addr.type.slice(1)}
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <Button size="sm" className="flex-1 cursor-pointer">
              Set Primary
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              onClick={() => setOpenEdit(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="destructive" size="sm" className="cursor-pointer">
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
