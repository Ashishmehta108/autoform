"use client";
import React, { useRef } from "react";
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

import { Loader } from "lucide-react";
import { useDashboardStore } from "@/app/dashboard/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { DocumentUploader } from "../Upload";
import { CreatePersonaInput, UploadedFile } from "@/lib/types/persona.types";
import { uuidv4 } from "zod";
import { toast } from "sonner";
import { ParseDescription } from "@/lib/utils";

const createPersona = async (data: CreatePersonaInput) => {
  const res = await fetch("/api/persona", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create persona");
  toast.success("Created persona successfully");
  return res.json();
};

export default function CreatePersonaModal() {
  const { isCreateModalOpen, setCreateModalOpen } = useDashboardStore();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const [formData, setFormData] = React.useState({
    personaName: "",
    personaEmail: "",
    personaDescription: "",
    role: "",
    experience: "",
    personauserdetaildocs: "",
    addresses: [{ type: "", street: "", city: "", state: "", zip: "" }],
  });

  const createPersonaMutation = useMutation({
    mutationFn: createPersona,
    onSuccess: (newPersona: CreatePersonaInput) => {
      queryClient.setQueryData(
        ["personas"],
        (old: CreatePersonaInput[] = []) => [...old, newPersona]
      );
      setCreateModalOpen(false);
      setFormData({
        personaName: "",
        personaEmail: "",
        personaDescription: "",
        role: "",
        experience: "",
        personauserdetaildocs: "",
        addresses: [{ type: "", street: "", city: "", state: "", zip: "" }],
      });
    },
  });

  const documentRef = useRef<UploadedFile[]>([]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeAddresstype = (index: number, val: string) => {
    setFormData((prev) => {
      const updatedAddresses = [...prev.addresses];
      updatedAddresses[index].type = val;
      return { ...prev, addresses: updatedAddresses };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const description = ParseDescription(
      formData.role,
      formData.experience,
      formData.personaDescription
    );
    const payload: CreatePersonaInput = {
      personaId: String(uuidv4()),
      personaName: formData.personaName,
      personaEmail: formData.personaEmail,
      personaDescription: description,
      userId: session?.user?.id!,
      username: session?.user?.name || "",
      personauserdetaildocs: formData.personauserdetaildocs || "",
      addresses: formData.addresses,
    };
    createPersonaMutation.mutate(payload);
  };

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
      <ScrollArea className="max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogContent className="sm:max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-lg bg-white dark:bg-neutral-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Create New Persona
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-600 dark:text-neutral-400">
              Generate an AI persona for automated form filling.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <div className="space-y-2">
              <Label htmlFor="personaName">Persona Name</Label>
              <Input
                id="personaName"
                value={formData.personaName}
                onChange={(e) => handleChange("personaName", e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personaEmail">Email</Label>
              <Input
                id="personaEmail"
                type="email"
                value={formData.personaEmail}
                onChange={(e) => handleChange("personaEmail", e.target.value)}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-3">
              <Label>Addresses</Label>
              {formData.addresses.map((address, index) => (
                <div
                  key={index}
                  className="space-y-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-4"
                >
                  <Select
                    value={formData.addresses[index].type}
                    onValueChange={(val) => handleChangeAddresstype(index, val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select address type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Permanent", "Temporary"].map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="grid grid-cols-2 gap-4">
                    {["street", "city", "state", "zip"].map((field) => (
                      <div key={field} className="space-y-2">
                        <Label htmlFor={`${field}-${index}`}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Label>
                        <Input
                          id={`${field}-${index}`}
                          value={address[field as keyof typeof address]}
                          onChange={(e) => {
                            const updated = [...formData.addresses];
                            updated[index][field as keyof typeof address] =
                              e.target.value;
                            setFormData({ ...formData, addresses: updated });
                          }}
                          placeholder={
                            field === "zip" ? "10001" : `Enter ${field}`
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {formData.addresses.length > 1 && (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                        onClick={() => {
                          const updated = formData.addresses.filter(
                            (_, i) => i !== index
                          );
                          setFormData({ ...formData, addresses: updated });
                        }}
                      >
                        Remove Address
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() =>
                  setFormData({
                    ...formData,
                    addresses: [
                      ...formData.addresses,
                      { type: "", street: "", city: "", state: "", zip: "" },
                    ],
                  })
                }
              >
                + Add Another Address
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(val) => handleChange("role", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Software Engineer",
                      "Marketing Manager",
                      "Product Designer",
                      "Data Analyst",
                      "Sales Representative",
                      "Project Manager",
                      "Business Analyst",
                      "Other",
                    ].map((r) => (
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
                  onValueChange={(val) => handleChange("experience", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "0-1 years",
                      "2-3 years",
                      "4-5 years",
                      "6-8 years",
                      "9+ years",
                    ].map((exp) => (
                      <SelectItem key={exp} value={exp}>
                        {exp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DocumentUploader
              isSubmitting={createPersonaMutation.isPending}
              accept={true}
              filesRef={documentRef}
            />

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={formData.personaDescription}
                onChange={(e) =>
                  handleChange("personaDescription", e.target.value)
                }
                placeholder="Write background or expertise..."
                className="resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateModalOpen(false)}
                className="flex-1"
                disabled={createPersonaMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
                disabled={
                  createPersonaMutation.isPending ||
                  !formData.personaName ||
                  !formData.personaEmail ||
                  !formData.role
                }
              >
                {createPersonaMutation.isPending ? (
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
