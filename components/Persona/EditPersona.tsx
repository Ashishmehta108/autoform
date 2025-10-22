"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Persona } from "@/lib/types/persona.types";

interface EditPersonaModalProps {
  persona: Persona;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditPersonaModal({
  persona,
  open,
  onOpenChange,
  onSuccess,
}: EditPersonaModalProps) {
  const parsedDesc =
    typeof persona.personaDescription === "string"
      ? JSON.parse(persona.personaDescription)
      : persona.personaDescription || {};

  const [formData, setFormData] = useState({
    username: persona.username || "",
    personaEmail: persona.personaEmail || "",
    personaImage: persona.personaImage || "",
    role: parsedDesc.role || "",
    experience: parsedDesc.experience || "",
    description: parsedDesc.description || "",
    addresses:
      persona.addresses && persona.addresses.length > 0
        ? persona.addresses
        : [{ type: "home", street: "", city: "", state: "", zip: "" }],
  });

  const [activeTab, setActiveTab] = useState<"general" | "addresses">(
    "general"
  );
  const [loading, setLoading] = useState(false);

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateAddress = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.addresses];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, addresses: updated };
    });
  };

  const handleAddAddress = () => {
    setFormData((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        { type: "", street: "", city: "", state: "", zip: "" },
      ],
    }));
  };

  const handleRemoveAddress = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/persona/${persona.personaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          personaEmail: formData.personaEmail,
          personaImage: formData.personaImage,
          personaDescription: JSON.stringify({
            role: formData.role,
            experience: formData.experience,
            description: formData.description,
          }),
          addresses: formData.addresses,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toast.success("Persona updated successfully");
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update persona");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-white dark:bg-neutral-900 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Persona</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-neutral-300 dark:border-neutral-700 mb-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "general"
                ? "border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "addresses"
                ? "border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
            onClick={() => setActiveTab("addresses")}
          >
            Addresses
          </button>
        </div>

        {activeTab === "general" && (
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={formData.username}
                onChange={(e) => updateField("username", e.target.value)}
                placeholder="Enter persona name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.personaEmail}
                onChange={(e) => updateField("personaEmail", e.target.value)}
                placeholder="Enter persona email"
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={formData.personaImage}
                onChange={(e) => updateField("personaImage", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                value={formData.role}
                onChange={(e) => updateField("role", e.target.value)}
                placeholder="e.g. Product Manager"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                value={formData.experience}
                onChange={(e) => updateField("experience", e.target.value)}
                placeholder="e.g. 5 years at Google"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Short description about persona"
              />
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div className="space-y-4">
            {formData.addresses.map((addr, idx) => (
              <div
                key={idx}
                className="p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg space-y-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={addr.type}
                    onChange={(e) => updateAddress(idx, "type", e.target.value)}
                    placeholder="Type (e.g. home)"
                  />
                  <Input
                    value={addr.street}
                    onChange={(e) =>
                      updateAddress(idx, "street", e.target.value)
                    }
                    placeholder="Street"
                  />
                  <Input
                    value={addr.city}
                    onChange={(e) => updateAddress(idx, "city", e.target.value)}
                    placeholder="City"
                  />
                  <Input
                    value={addr.state}
                    onChange={(e) =>
                      updateAddress(idx, "state", e.target.value)
                    }
                    placeholder="State"
                  />
                  <Input
                    value={addr.zip}
                    onChange={(e) => updateAddress(idx, "zip", e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
                {formData.addresses.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveAddress(idx)}
                  >
                    Remove A ddress
                  </Button>
                )}
              </div>
            ))}
            <Button variant="secondary" size="sm" onClick={handleAddAddress}>
              + Add Address
            </Button>
          </div>
        )}

        <DialogFooter className="mt-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
