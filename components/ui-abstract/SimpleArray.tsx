import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const SimpleArrayField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: string;
}> = React.memo(({ label, value, onChange, placeholder, helper }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    {helper && (
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{helper}</p>
    )}
  </div>
));
SimpleArrayField.displayName = "SimpleArrayField";
