import { Address } from "./user.types";

export type CreatePersonaInput = {
  personaId: string;
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
}

export type Persona = {
  personaId: string;
  personaName: string;
  userId: string;
  username?: string;
  personaEmail?: string;
  personaImage?: string;
  personaDescription: string;
  personauserdetaildocs?: string;
  personauserdetailsummary: string;
  addresses: Address[];
};
