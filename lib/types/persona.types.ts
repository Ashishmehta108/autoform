import { Address } from "./user.types";

export type CreatePersonaInput = {
  personaName: string;
  userId: string;
  username?: string;
  phoneNumber?: string;
  personaImage?: string;
  description?: string;
  summary?: string;

  addresses?: Address[];
  education?: {
    degree: string;
    institution?: string;
    graduationYear?: string;
    fieldOfStudy?: string;
  }[];
  workExperience?: {
    company?: string;
    position: string;
    startDate?: string;
    endDate?: string;
    highlights?: string[];
  }[];
  projects?: {
    name: string;
    description?: string;
    technologies?: string[];
    link?: string;
  }[];

  skills?: string[];
  interests?: string[];
  hobbies?: string[];
  languages?: string[];

  gender?: "Male" | "Female" | "Other" | "Prefer not to say";
  nationality?: string;

  socialProfiles?: {
    platform: "LinkedIn" | "GitHub" | "Twitter" | "Portfolio" | "Other";
    handle?: string;
    url?: string;
  }[];
};

export type UpdatePersonaInput = Partial<CreatePersonaInput> & {
  personaId: string;
};

export interface UploadedFile {
  file: File;
  preview: string;
  uploadedUrl?: string;
  fileName: string;
}

export interface Persona {
  personaId: string;
  personaName: string;
  userId: string;
  username?: string | null;
  phoneNumber?: string | null;
  personaImage?: string | null;
  description?: string | null;
  summary?: string | null;

  addresses?: Address[] | null;
  education?:
    | {
        degree: string;
        institution?: string;
        graduationYear?: string;
        fieldOfStudy?: string;
      }[]
    | null;
  workExperience?:
    | {
        company?: string;
        position: string;
        startDate?: string;
        endDate?: string;
        highlights?: string[];
      }[]
    | null;
  projects?:
    | {
        name: string;
        description?: string;
        technologies?: string[];
        link?: string;
      }[]
    | null;

  skills?: string[] | null;
  interests?: string[] | null;
  hobbies?: string[] | null;
  languages?: string[] | null;

  gender?: "Male" | "Female" | "Other" | "Prefer not to say" | null;
  nationality?: string | null;

  socialProfiles?:
    | {
        platform: "LinkedIn" | "GitHub" | "Twitter" | "Portfolio" | "Other";
        handle?: string;
        url?: string;
      }[]
    | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}
