import { Address } from "./user.types";

export type CreatePersonaInput = {
  personaName: string;
  userId: string;
  username?: string;
  personaEmail?: string;
  personaImage?: string;
  personaDescription?: string;
  personauserdetaildocs?: string;
  addresses: Address[];
};

export type UpdatePersonaInput = {
  personaId: string;
  personaName?: string;
  username?: string;
  personaEmail?: string;
  personaImage?: string;
  personaDescription?: string;
  personauserdetaildocs?: string;
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
  userId: string | null;
  username: string | null;
  personaEmail: string | null;
  personaImage: string | null;
  personaDescription: string | null;
  personauserdetaildocs: string | null;
  personauserdetailsummary: string | null;
  addresses: Address[] | null;
}
