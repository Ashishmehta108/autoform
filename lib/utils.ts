import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ParseDescription(
  role: string,
  experience: string,
  description: string
) {
  const desc = JSON.stringify({
    role: role,
    experience: experience,
    description: description,
  });
  return desc;
}
