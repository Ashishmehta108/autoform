"use client";

import { Persona } from "@/lib/types/persona.types";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function UploadTest() {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [url, setUrl] = useState<string>("");

//   const handleUpload = async () => {
//     if (!file) return;

//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("/api/cloudinary/upload/single", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setUrl(data.url);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <Input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//       />
//       <Button onClick={handleUpload} disabled={uploading}>
//         {uploading ? "Uploading..." : "Upload"}
//       </Button>
//       {url && (
//         <div>
//           <p>Uploaded Image:</p>
//           <img src={url} alt="Uploaded" className="mt-2 max-w-xs" />
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, Edit, Trash2, Settings } from "lucide-react";

interface Address {
  type: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Persona {
  personaId: string;
  personaName: string;
  userId: string;
  username: string;
  personaEmail: string;
  personaImage?: string;
  personaDescription: Record<string, string> | string;
  personauserdetaildocs?: string;
  personauserdetailsummary?: string;
  addresses?: Address[];
}

export default function PersonaCard() {
  const persona: Persona[] = [
    {
      personaId: "b8a94897-5bbe-4f66-9503-a0fb53dc128c",
      personaName: "Ashish Mehta",
      userId: "5d6ae04d-4ccd-4e74-a0a8-51e74337f27b",
      username: "Ashish Mehta",
      personaEmail: "ashishmehtawork108@gmail.com",
      personaImage: "",
      personaDescription:
        '{"role":"Software Engineer","experience":"0-1 years","description":"I am Ashish Mehta, an undergrad student in Sri Sukhmani Institute of Engg and Tech 4th year. My skills are Next.js, TypeScript."}',
      addresses: [
        {
          type: "temporary",
          street: "Derabaszsi",
          city: "Derabassi",
          state: "Punjab",
          zip: "140507",
        },
      ],
    },
  ];

  persona.forEach((p) => {
    if (typeof p.personaDescription === "string") {
      p.personaDescription = JSON.parse(p.personaDescription);
    }
  });
console.log(persona)
  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      {persona.map((p, key) => (
        <Card
          key={key}
          className="relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
        >
          <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_2px_6px_rgba(255,255,255,0.03)]" />

          <CardHeader className="flex items-center justify-between relative z-10 pb-3">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xl font-semibold text-neutral-600 dark:text-neutral-300 overflow-hidden">
                {p.personaImage ? (
                  <img
                    src={p.personaImage}
                    alt={p.username}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  p.username[0].toUpperCase()
                )}
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  {p.username}
                </CardTitle>
                
                <CardDescription className="text-sm text-neutral-400 dark:text-neutral-400">
                  {p.personaDescription.role || "No role specified"}
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
              <span>{p.personaEmail}</span>
            </div>
            {p.personaDescription.experience && (
              <div className="flex items-center space-x-3">
                <Briefcase className="w-4 h-4 text-neutral-400" />
                <span>{p.personaDescription.experience}</span>
              </div>
            )}

            {p.personaDescription.description && (
              <>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Description
                </span>
                <div className="h-28 overflow-y-auto text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 border  dark:border-neutral-700 p-3 rounded-lg">
                  {p.personaDescription.description}
                </div>
              </>
            )}

            {p.addresses && p.addresses.length > 0 && (
              <div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Addresses
                </span>
                <div className="space-y-2 mt-2">
                  {p.addresses.map((addr, idx) => (
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
              <Button size="sm" className={`flex-1  cursor-pointer `}>
                Set Primary
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
