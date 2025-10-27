export type CreatePersonaInput = {
  personaName: string;
  userId: string;
  username?: string;
  phoneNumber?: string;
  personaImage?: string;
  personaDescription?: string;
  summary?: string;
  personaEmail: string;

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
  document?: string;
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

export type AddrType = "Permanent" | "Temporary";

export interface Persona {
  personaId: string;
  personaName: string;
  userId: string;
  username?: string | null;
  phoneNumber?: string | null;
  personaImage?: string | null;
  personaDescription?: string | null;
  summary?: string | null;
  personaEmail: string;
  addresses?: Address[] | null;
  document?: string;
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

export interface Address {
  type: AddrType;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Education {
  degree: string;
  institution?: string;
  graduationYear?: string;
  fieldOfStudy?: string;
}

export interface WorkExperience {
  company?: string;
  position: string;
  startDate?: string;
  endDate?: string;
  highlights?: string;
}

export interface Project {
  name: string;
  description?: string;
  technologies?: string;
  link?: string;
}

export interface SocialProfile {
  platform: "LinkedIn" | "GitHub" | "Twitter" | "Portfolio" | "Other";
  handle?: string;
  url?: string;
}

export interface FormData {
  personaName: string;
  personaEmail: string;
  personaDescription: string;
  role: string;
  personaPhone: string;
  experience: string;
  personauserdetaildocs: string;
  addresses: Address[];
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
  skills: string;
  interests: string;
  hobbies: string;
  languages: string;
  gender?: "Male" | "Female" | "Other" | "Prefer not to say";
  nationality?: string;
  socialProfiles: SocialProfile[];
}
