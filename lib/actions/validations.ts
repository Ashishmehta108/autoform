import { z } from "zod";

export const educationSchema = z.object({
  degree: z.string(),
  institution: z.string().optional(),
  graduationYear: z.string().optional(),
  fieldOfStudy: z.string().optional(),
});
export const workExperienceSchema = z.object({
  company: z.string().optional(),
  position: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const projectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  link: z.string().optional(),
});

export const socialProfileSchema = z.object({
  platform: z.enum(["LinkedIn", "GitHub", "Twitter", "Portfolio", "Other"]),
  handle: z.string().optional(),
  url: z.string().optional(),
});

export const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
});

export const createPersonaSchema = z.object({
  personaName: z.string().min(1, "Persona name is required"),
  personaEmail: z
    .string()
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
      message: "Email is invalid",
    }),
  userId: z.string().min(1, "User ID is required"),
  username: z.string().optional(),
  phoneNumber: z.string().optional(),
  personaImage: z.string().optional(),
  description: z.string().optional(),
  summary: z.string().optional(),
  addresses: z.array(addressSchema).optional(),
  education: z.array(educationSchema).optional(),
  workExperience: z.array(workExperienceSchema).optional(),
  projects: z.array(projectSchema).optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  hobbies: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  personaDescription: z.string(),
  document: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]).optional(),
  nationality: z.string().optional(),

  socialProfiles: z.array(socialProfileSchema).optional(),
});

export type CreatePersonaInputValidated = z.infer<typeof createPersonaSchema>;

export const updatePersonaSchema = createPersonaSchema.partial().extend({
  personaId: z.string().min(1, "personaId is required for updating"),
});

export type UpdatePersonaInputValidated = z.infer<typeof updatePersonaSchema>;
