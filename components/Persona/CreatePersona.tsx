// "use client";
// import React, { useRef } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Loader } from "lucide-react";
// import { useDashboardStore } from "../dashboard/DashboardClient";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { DocumentUploader } from "../Upload";
// import { CreatePersonaInput, UploadedFile } from "@/lib/types/persona.types";
// import { toast } from "sonner";
// import { ParseDescription } from "@/lib/utils";

// interface Address {
//   type: "Permanent" | "Temporary";
//   street: string;
//   city: string;
//   state: string;
//   zip: string;
// }

// interface FormData {
//   personaName: string;
//   personaEmail: string;
//   personaDescription: string;
//   role: string;
//   experience: string;
//   personauserdetaildocs: string;
//   addresses: Address[];
// }

// const createPersona = async (data: CreatePersonaInput) => {
//   const res = await fetch("/api/persona", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) throw new Error("Failed to create persona");
//   toast.success("Created persona successfully");
//   return res.json();
// };

// export default function CreatePersonaModal() {
//   const { isCreateModalOpen, setCreateModalOpen } = useDashboardStore();
//   const queryClient = useQueryClient();
//   const { data: session } = useSession();

//   const [formData, setFormData] = React.useState<FormData>({
//     personaName: "",
//     personaEmail: "",
//     personaDescription: "",
//     role: "",
//     experience: "",
//     personauserdetaildocs: "",
//     addresses: [
//       { type: "Temporary", street: "", city: "", state: "", zip: "" },
//     ],
//   });

//   const resetForm = () =>
//     setFormData({
//       personaName: "",
//       personaEmail: "",
//       personaDescription: "",
//       role: "",
//       experience: "",
//       personauserdetaildocs: "",
//       addresses: [
//         { type: "Temporary", street: "", city: "", state: "", zip: "" },
//       ],
//     });

//   const createPersonaMutation = useMutation({
//     mutationFn: createPersona,
//     onSuccess: (newPersona: CreatePersonaInput) => {
//       queryClient.setQueryData<CreatePersonaInput[]>(
//         ["personas"],
//         (old = []) => [...old, newPersona],
//       );
//       setCreateModalOpen(false);
//       resetForm();
//     },
//   });

//   const documentRef = useRef<UploadedFile[]>([]);

//   const handleChange = <K extends keyof FormData>(
//     field: K,
//     value: FormData[K],
//   ) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleChangeAddresstype = (
//     index: number,
//     val: "Temporary" | "Permanent",
//   ) => {
//     setFormData((prev) => {
//       const updatedAddresses = [...prev.addresses];
//       updatedAddresses[index].type = val;
//       return { ...prev, addresses: updatedAddresses };
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!session?.user?.id) {
//       toast.error("You must be logged in to create a persona");
//       return;
//     }

//     const description = ParseDescription(
//       formData.role,
//       formData.experience,
//       formData.personaDescription,
//     );
//     console.log("Parsed Description:", documentRef.current);

//     const payload: CreatePersonaInput = {
//       personaName: formData.personaName,
//       email: formData.personaEmail,
//       description: description,
//       userId: session.user.id,
//       username: session.user.name || "",
//       document: documentRef.current[0].fileName || "",
//       addresses: formData.addresses,
//     };
//     createPersonaMutation.mutate(payload);
//   };

//   return (
//     <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
//       <ScrollArea className="max-h-[90vh] overflow-y-auto scrollbar-thin">
//         <DialogContent className="sm:max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-lg bg-white dark:bg-neutral-900">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
//               Create New Persona
//             </DialogTitle>
//             <DialogDescription className="text-sm text-neutral-600 dark:text-neutral-400">
//               Generate an AI persona for automated form filling.
//             </DialogDescription>
//           </DialogHeader>

//           <form onSubmit={handleSubmit} className="space-y-6 pt-2">
//             <div className="space-y-2">
//               <Label htmlFor="personaName">Persona Name</Label>
//               <Input
//                 id="personaName"
//                 value={formData.personaName}
//                 onChange={(e) => handleChange("personaName", e.target.value)}
//                 required
//                 placeholder="John Doe"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="personaEmail">Email</Label>
//               <Input
//                 id="personaEmail"
//                 type="email"
//                 value={formData.personaEmail}
//                 onChange={(e) => handleChange("personaEmail", e.target.value)}
//                 required
//                 placeholder="john@example.com"
//               />
//             </div>

//             <div className="space-y-3">
//               <Label>Addresses</Label>
//               {formData.addresses.map((address, index) => (
//                 <div
//                   key={index}
//                   className="space-y-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-4"
//                 >
//                   <Select
//                     value={address.type}
//                     onValueChange={(val) =>
//                       handleChangeAddresstype(
//                         index,
//                         val as "Temporary" | "Permanent",
//                       )
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select address type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {["Permanent", "Temporary"].map((r) => (
//                         <SelectItem key={r} value={r}>
//                           {r}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <div className="grid grid-cols-2 gap-4">
//                     {(["street", "city", "state", "zip"] as const).map(
//                       (field) => (
//                         <div key={field} className="space-y-2">
//                           <Label htmlFor={`${field}-${index}`}>
//                             {field.charAt(0).toUpperCase() + field.slice(1)}
//                           </Label>
//                           <Input
//                             id={`${field}-${index}`}
//                             value={address[field]}
//                             onChange={(e) => {
//                               const updated = [...formData.addresses];
//                               updated[index][field] = e.target.value;
//                               setFormData({ ...formData, addresses: updated });
//                             }}
//                             placeholder={
//                               field === "zip" ? "10001" : `Enter ${field}`
//                             }
//                           />
//                         </div>
//                       ),
//                     )}
//                   </div>

//                   {formData.addresses.length > 1 && (
//                     <div className="flex justify-end">
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
//                         onClick={() => {
//                           const updated = formData.addresses.filter(
//                             (_, i) => i !== index,
//                           );
//                           setFormData({ ...formData, addresses: updated });
//                         }}
//                       >
//                         Remove Address
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 className="w-full"
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     addresses: [
//                       ...formData.addresses,
//                       {
//                         type: "Temporary",
//                         street: "",
//                         city: "",
//                         state: "",
//                         zip: "",
//                       },
//                     ],
//                   })
//                 }
//               >
//                 + Add Another Address
//               </Button>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Role</Label>
//                 <Select
//                   value={formData.role}
//                   onValueChange={(val) => handleChange("role", val)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[
//                       "Software Engineer",
//                       "Marketing Manager",
//                       "Product Designer",
//                       "Data Analyst",
//                       "Sales Representative",
//                       "Project Manager",
//                       "Business Analyst",
//                       "Other",
//                     ].map((r) => (
//                       <SelectItem key={r} value={r}>
//                         {r}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label>Experience</Label>
//                 <Select
//                   value={formData.experience}
//                   onValueChange={(val) => handleChange("experience", val)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select experience" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[
//                       "0-1 years",
//                       "2-3 years",
//                       "4-5 years",
//                       "6-8 years",
//                       "9+ years",
//                     ].map((exp) => (
//                       <SelectItem key={exp} value={exp}>
//                         {exp}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <DocumentUploader
//               isSubmitting={createPersonaMutation.isPending}
//               accept={true}
//               filesRef={documentRef}
//             />

//             <div className="space-y-2">
//               <Label>Description</Label>
//               <Textarea
//                 rows={3}
//                 value={formData.personaDescription}
//                 onChange={(e) =>
//                   handleChange("personaDescription", e.target.value)
//                 }
//                 placeholder="Write background or expertise..."
//                 className="resize-none"
//               />
//             </div>

//             <div className="flex gap-3 pt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setCreateModalOpen(false)}
//                 className="flex-1"
//                 disabled={createPersonaMutation.isPending}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="flex-1 "
//                 disabled={
//                   createPersonaMutation.isPending ||
//                   !formData.personaName ||
//                   !formData.personaEmail ||
//                   !formData.role
//                 }
//               >
//                 {createPersonaMutation.isPending ? (
//                   <>
//                     <Loader className="w-4 h-4 mr-2 animate-spin" />
//                     Creating...
//                   </>
//                 ) : (
//                   "Create Persona"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </ScrollArea>
//     </Dialog>
//   );
// }

"use client";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Plus, Trash } from "lucide-react";
import { useDashboardStore } from "../dashboard/DashboardClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { DocumentUploader } from "../Upload";
import {
  CreatePersonaInput,
  Education,
  FormData,
  Project,
  SocialProfile,
  UploadedFile,
  WorkExperience,
} from "@/lib/types/persona.types";
import { toast } from "sonner";
import { ParseDescription } from "@/lib/utils";
import InputWithLabelElement from "../ui-abstract/InputWithLabelElement";
import { SimpleArrayField } from "../ui-abstract/SimpleArray";

const createPersona = async (data: CreatePersonaInput) => {
  const res = await fetch("/api/persona", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "Unknown error");
    console.error("createPersona failed:", txt);
    throw new Error(txt || "Failed to create persona");
  }

  toast.success("Persona created");
  return res.json();
};

export default function CreatePersonaModal() {
  const { isCreateModalOpen, setCreateModalOpen } = useDashboardStore();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const documentRef = useRef<UploadedFile[]>([]);

  const [formData, setFormData] = React.useState<FormData>({
    personaName: "",
    personaEmail: "",
    personaDescription: "",
    role: "",
    experience: "",
    personauserdetaildocs: "",
    addresses: [
      { type: "Temporary", street: "", city: "", state: "", zip: "" },
    ],
    education: [
      { degree: "", institution: "", graduationYear: "", fieldOfStudy: "" },
    ],
    workExperience: [
      { company: "", position: "", startDate: "", endDate: "", highlights: "" },
    ],
    projects: [{ name: "", description: "", technologies: "", link: "" }],
    skills: "",
    interests: "",
    hobbies: "",
    languages: "",
    gender: undefined,
    nationality: "",
    socialProfiles: [{ platform: "LinkedIn", handle: "", url: "" }],
  });

  const resetForm = useCallback(() => {
    setFormData({
      personaName: "",
      personaEmail: "",
      personaDescription: "",
      role: "",
      experience: "",
      personauserdetaildocs: "",
      addresses: [
        { type: "Temporary", street: "", city: "", state: "", zip: "" },
      ],
      education: [
        { degree: "", institution: "", graduationYear: "", fieldOfStudy: "" },
      ],
      workExperience: [
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          highlights: "",
        },
      ],
      projects: [{ name: "", description: "", technologies: "", link: "" }],
      skills: "",
      interests: "",
      hobbies: "",
      languages: "",
      gender: undefined,
      nationality: "",
      socialProfiles: [{ platform: "LinkedIn", handle: "", url: "" }],
    });
    documentRef.current = [];
  }, []);

  const mutation = useMutation({
    mutationFn: createPersona,
    onSuccess: (newPersona: CreatePersonaInput) => {
      queryClient.setQueryData<CreatePersonaInput[]>(
        ["personas"],
        (old = []) => [...old, newPersona],
      );
      setCreateModalOpen(false);
      resetForm();
    },
    onError: (err: unknown) => {
      toast.error(err?.message || "Failed to create persona");
    },
  });

  const setField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const updateArrayAt = useCallback(
    <T, K extends keyof FormData>(
      field: K,
      index: number,
      updater: (item: any) => any,
    ) => {
      setFormData((prev) => {
        const list = (prev[field] as unknown as T[]).slice();
        list[index] = updater(list[index]);
        return { ...prev, [field]: list } as unknown as FormData;
      });
    },
    [],
  );

  const pushToArray = useCallback(
    <T, K extends keyof FormData>(field: K, item: T) => {
      setFormData(
        (prev) =>
          ({
            ...prev,
            [field]: [...(prev[field] as unknown as T[]), item],
          }) as unknown as FormData,
      );
    },
    [],
  );

  const removeFromArray = useCallback(
    <K extends keyof FormData>(field: K, index: number) => {
      setFormData((prev) => {
        const list = (prev[field] as unknown as any[]).filter(
          (_, i) => i !== index,
        );
        return { ...prev, [field]: list } as unknown as FormData;
      });
    },
    [],
  );
  const nonEmptyArray = <T,>(arr?: T[] | null) =>
    (arr ?? []).filter((it) => {
      if (!it) return false;
      if (typeof it === "object") {
        return Object.values(it).some((v) =>
          Array.isArray(v) ? v.length > 0 : Boolean(v),
        );
      }
      return Boolean(it);
    });
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!session?.user?.id) {
        toast.error("You must be logged in to create a persona");
        return;
      }

      if (!formData.personaName || !formData.personaEmail || !formData.role) {
        toast.error("Please fill required fields: name, email, role");
        return;
      }

      const payload: CreatePersonaInput = {
        personaName: formData.personaName,
        email: formData.personaEmail,
        description: ParseDescription(
          formData.role,
          formData.experience,
          formData.personaDescription,
        ),
        userId: session.user.id,
        username: session.user.name || "",
        document: documentRef.current[0]?.fileName || "",
        addresses: formData.addresses,
        education: nonEmptyArray<Education>(formData.education),
        workExperience: nonEmptyArray<WorkExperience>(
          formData.workExperience,
        ).map((w) => ({
          ...w,
          highlights: w.highlights
            ? w.highlights
                .split(/\n|,/)
                .map((s) => s.trim())
                .filter(Boolean)
            : undefined,
        })),
        projects: nonEmptyArray<Project>(formData.projects).map((p) => ({
          ...p,
          technologies: p.technologies
            ? p.technologies
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : undefined,
        })),
        skills: formData.skills
          ? formData.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
        interests: formData.interests
          ? formData.interests
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
        hobbies: formData.hobbies
          ? formData.hobbies
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
        languages: formData.languages
          ? formData.languages
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
        gender: formData.gender,
        nationality: formData.nationality || undefined,
        socialProfiles: nonEmptyArray<SocialProfile>(
          formData.socialProfiles,
        ).map((s) => ({
          ...s,
          handle: s.handle?.trim() || undefined,
          url: s.url?.trim() || undefined,
        })),
      };

      mutation.mutate(payload);
    },
    [formData, session, mutation],
  );
  const roleOptions = useMemo(
    () => [
      "Software Engineer",
      "Marketing Manager",
      "Product Designer",
      "Data Analyst",
      "Sales Representative",
      "Project Manager",
      "Business Analyst",
      "Other",
    ],
    [],
  );
  const experienceOptions = useMemo(
    () => ["0-1 years", "2-3 years", "4-5 years", "6-8 years", "9+ years"],
    [],
  );

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
      <ScrollArea className="max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogContent className="sm:max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-lg bg-white dark:bg-neutral-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Create New Persona
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-600 dark:text-neutral-400">
              Fill details to generate a persona for automated form filling.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <div className="grid grid-cols-2 gap-4">
              {/*<div className="space-y-2">
                <Label htmlFor="personaName">Persona Name</Label>
                <Input
                  id="personaName"
                  type="text"
                  value={formData.personaName}
                  onChange={(e) => setField("personaName", e.target.value)}
                  required
                  className="placeholdee:text-neutral-100"
                  placeholder="John Doe"
                />
              </div>*/}
              <InputWithLabelElement
                labelFor="personaName"
                lableText="Persona Name"
                inputType="text"
                inputValue={formData.personaEmail}
                setField={setField}
                inputId="personaEmail"
              />
              <InputWithLabelElement
                labelFor="personaEmail"
                lableText="Email"
                inputType="email"
                inputValue={formData.personaEmail}
                setField={setField}
                inputId="personaEmail"
              />
              {/*<div className="space-y-2">
                <Label htmlFor="personaEmail">Email</Label>
                <Input
                  id="personaEmail"
                  type="email"
                  value={formData.personaEmail}
                  onChange={(e) => setField("personaEmail", e.target.value)}
                  required
                  placeholder="john@example.com"
                />
              </div>*/}
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(v) => setField("role", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Experience</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(v) => setField("experience", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map((exp) => (
                      <SelectItem key={exp} value={exp}>
                        {exp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={formData.gender || ""}
                  onValueChange={(v) =>
                    setField("gender", (v as FormData["gender"]) || undefined)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Male", "Female", "Other", "Prefer not to say"].map(
                      (g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nationality</Label>
                <Input
                  value={formData.nationality}
                  onChange={(e) => setField("nationality", e.target.value)}
                  placeholder="India"
                />
              </div>

              <div className="space-y-2">
                <Label>Short Description (optional)</Label>
                <Textarea
                  rows={2}
                  value={formData.personaDescription}
                  onChange={(e) =>
                    setField("personaDescription", e.target.value)
                  }
                  placeholder="Brief background"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Addresses</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() =>
                    pushToArray<Address, "addresses">("addresses", {
                      type: "Temporary",
                      street: "",
                      city: "",
                      state: "",
                      zip: "",
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </div>

              {formData.addresses.map((address, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-800 space-y-3"
                >
                  <div className="flex gap-2">
                    <Select
                      value={address.type}
                      onValueChange={(v) =>
                        updateArrayAt<Address, "addresses">(
                          "addresses",
                          idx,
                          (a) => ({ ...a, type: v as AddrType }),
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                        <SelectItem value="Permanent">Permanent</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="ml-auto flex gap-2">
                      {formData.addresses.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          type="button"
                          onClick={() => removeFromArray("addresses", idx)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Street"
                      value={address.street}
                      onChange={(e) =>
                        updateArrayAt<Address, "addresses">(
                          "addresses",
                          idx,
                          (a) => ({ ...a, street: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        updateArrayAt<Address, "addresses">(
                          "addresses",
                          idx,
                          (a) => ({ ...a, city: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="State"
                      value={address.state}
                      onChange={(e) =>
                        updateArrayAt<Address, "addresses">(
                          "addresses",
                          idx,
                          (a) => ({ ...a, state: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="ZIP"
                      value={address.zip}
                      onChange={(e) =>
                        updateArrayAt<Address, "addresses">(
                          "addresses",
                          idx,
                          (a) => ({ ...a, zip: e.target.value }),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ----- Education (multi) ----- */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Education</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() =>
                    pushToArray<Education, "education">("education", {
                      degree: "",
                      institution: "",
                      graduationYear: "",
                      fieldOfStudy: "",
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </div>

              {formData.education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-800 space-y-3"
                >
                  <div className="flex justify-between">
                    <Label className="text-sm">
                      {edu.degree || "New education"}
                    </Label>
                    <div className="flex gap-2">
                      {formData.education.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          type="button"
                          onClick={() => removeFromArray("education", i)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Degree (e.g. B.Tech)"
                      value={edu.degree}
                      onChange={(e) =>
                        updateArrayAt<Education, "education">(
                          "education",
                          i,
                          (x) => ({ ...x, degree: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        updateArrayAt<Education, "education">(
                          "education",
                          i,
                          (x) => ({ ...x, institution: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="Graduation Year"
                      value={edu.graduationYear}
                      onChange={(e) =>
                        updateArrayAt<Education, "education">(
                          "education",
                          i,
                          (x) => ({ ...x, graduationYear: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="Field of Study"
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        updateArrayAt<Education, "education">(
                          "education",
                          i,
                          (x) => ({ ...x, fieldOfStudy: e.target.value }),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ----- Work Experience ----- */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Work Experience</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() =>
                    pushToArray<WorkExperience, "workExperience">(
                      "workExperience",
                      {
                        company: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        highlights: "",
                      },
                    )
                  }
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </div>

              {formData.workExperience.map((work, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-800 space-y-3"
                >
                  <div className="flex justify-between">
                    <Label className="text-sm">
                      {work.position || "New role"}
                    </Label>
                    <div className="flex gap-2">
                      {formData.workExperience.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          type="button"
                          onClick={() => removeFromArray("workExperience", i)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      placeholder="Company"
                      value={work.company}
                      onChange={(e) =>
                        updateArrayAt<WorkExperience, "workExperience">(
                          "workExperience",
                          i,
                          (x) => ({ ...x, company: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="Position"
                      value={work.position}
                      onChange={(e) =>
                        updateArrayAt<WorkExperience, "workExperience">(
                          "workExperience",
                          i,
                          (x) => ({ ...x, position: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="Start (YYYY-MM)"
                      value={work.startDate}
                      onChange={(e) =>
                        updateArrayAt<WorkExperience, "workExperience">(
                          "workExperience",
                          i,
                          (x) => ({ ...x, startDate: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="End (YYYY-MM or Present)"
                      value={work.endDate}
                      onChange={(e) =>
                        updateArrayAt<WorkExperience, "workExperience">(
                          "workExperience",
                          i,
                          (x) => ({ ...x, endDate: e.target.value }),
                        )
                      }
                    />
                    <Textarea
                      placeholder="Highlights (comma or newline separated)"
                      rows={2}
                      value={work.highlights}
                      onChange={(e) =>
                        updateArrayAt<WorkExperience, "workExperience">(
                          "workExperience",
                          i,
                          (x) => ({ ...x, highlights: e.target.value }),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ----- Projects ----- */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Projects</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() =>
                    pushToArray<Project, "projects">("projects", {
                      name: "",
                      description: "",
                      technologies: "",
                      link: "",
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </div>

              {formData.projects.map((p, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-800 space-y-3"
                >
                  <div className="flex justify-between">
                    <Label className="text-sm">{p.name || "New project"}</Label>
                    <div className="flex gap-2">
                      {formData.projects.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          type="button"
                          onClick={() => removeFromArray("projects", i)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Project Name"
                      value={p.name}
                      onChange={(e) =>
                        updateArrayAt<Project, "projects">(
                          "projects",
                          i,
                          (x) => ({ ...x, name: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="Link"
                      value={p.link}
                      onChange={(e) =>
                        updateArrayAt<Project, "projects">(
                          "projects",
                          i,
                          (x) => ({ ...x, link: e.target.value }),
                        )
                      }
                    />
                    <Textarea
                      placeholder="Short description"
                      rows={2}
                      value={p.description}
                      onChange={(e) =>
                        updateArrayAt<Project, "projects">(
                          "projects",
                          i,
                          (x) => ({ ...x, description: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="Technologies (comma separated)"
                      value={p.technologies}
                      onChange={(e) =>
                        updateArrayAt<Project, "projects">(
                          "projects",
                          i,
                          (x) => ({ ...x, technologies: e.target.value }),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ----- Skills / Interests / Hobbies / Languages (simple inputs) ----- */}
            <div className="grid grid-cols-2 gap-4">
              <SimpleArrayField
                label="Skills"
                value={formData.skills}
                onChange={(v) => setField("skills", v)}
                placeholder="React, Node.js, SQL"
                helper="Comma separated"
              />
              <SimpleArrayField
                label="Interests"
                value={formData.interests}
                onChange={(v) => setField("interests", v)}
                placeholder="AI, Startups"
                helper="Comma separated"
              />
              <SimpleArrayField
                label="Hobbies"
                value={formData.hobbies}
                onChange={(v) => setField("hobbies", v)}
                placeholder="Cycling, Photography"
                helper="Comma separated"
              />
              <SimpleArrayField
                label="Languages"
                value={formData.languages}
                onChange={(v) => setField("languages", v)}
                placeholder="English, Hindi"
                helper="Comma separated"
              />
            </div>

            {/* ----- Social profiles ----- */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Social Profiles</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() =>
                    pushToArray<SocialProfile, "socialProfiles">(
                      "socialProfiles",
                      { platform: "Other", handle: "", url: "" },
                    )
                  }
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </div>

              {formData.socialProfiles.map((sp, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-800 space-y-3"
                >
                  <div className="grid grid-cols-3 gap-3 items-center">
                    <Select
                      value={sp.platform}
                      onValueChange={(v) =>
                        updateArrayAt<SocialProfile, "socialProfiles">(
                          "socialProfiles",
                          i,
                          (x) => ({
                            ...x,
                            platform: v as SocialProfile["platform"],
                          }),
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "LinkedIn",
                          "GitHub",
                          "Twitter",
                          "Portfolio",
                          "Other",
                        ].map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      placeholder="Handle (e.g. @john)"
                      value={sp.handle}
                      onChange={(e) =>
                        updateArrayAt<SocialProfile, "socialProfiles">(
                          "socialProfiles",
                          i,
                          (x) => ({ ...x, handle: e.target.value }),
                        )
                      }
                    />
                    <Input
                      placeholder="URL"
                      value={sp.url}
                      onChange={(e) =>
                        updateArrayAt<SocialProfile, "socialProfiles">(
                          "socialProfiles",
                          i,
                          (x) => ({ ...x, url: e.target.value }),
                        )
                      }
                    />
                  </div>

                  {formData.socialProfiles.length > 1 && (
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromArray("socialProfiles", i)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <DocumentUploader
              isSubmitting={mutation.isPending}
              accept={true}
              filesRef={documentRef}
            />
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCreateModalOpen(false);
                }}
                className="flex-1"
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={
                  mutation.isPending ||
                  !formData.personaName ||
                  !formData.personaEmail ||
                  !formData.role
                }
              >
                {mutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Persona"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
}
