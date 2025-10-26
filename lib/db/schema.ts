export const runtime = "nodejs";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  json,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";
import { Address } from "../types/persona.types";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  razorpaySubscriptionId: text("razorpaySubscriptionId"),
  subscriptionStartedAt: timestamp("subscriptionStartedAt", { mode: "date" }),
  subscriptionExpiresAt: timestamp("subscriptionExpiresAt", { mode: "date" }),
  subscriptionPlan: text("subscriptionPlan").default("free").notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [primaryKey(account.provider, account.providerAccountId)],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey(vt.identifier, vt.token)],
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    primaryKey(authenticator.userId, authenticator.credentialID),
  ],
);

export const persona = pgTable("persona", {
  personaId: text("personaId").primaryKey(),
  personaName: text("personaName").notNull(),

  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  personaEmail: text("email"),

  username: text("username"),
  phoneNumber: text("phoneNumber"),
  personaImage: text("personaImage"),
  personaDescription: text("description"),
  summary: text("summary"),
  document: text("document"),
  addresses: json("addresses").$type<Address[]>(),
  education: json("education").$type<
    {
      degree: string;
      institution?: string;
      graduationYear?: string;
      fieldOfStudy?: string;
    }[]
  >(),
  workExperience: json("workExperience").$type<
    {
      company?: string;
      position: string;
      startDate?: string;
      endDate?: string;
      highlights?: string[];
    }[]
  >(),
  projects: json("projects").$type<
    {
      name: string;
      description?: string;
      technologies?: string[];
      link?: string;
    }[]
  >(),
  skills: json("skills").$type<string[]>(),
  interests: json("interests").$type<string[]>(),
  hobbies: json("hobbies").$type<string[]>(),
  languages: json("languages").$type<string[]>(),

  gender: text("gender"),
  nationality: text("nationality"),

  socialProfiles: json("socialProfiles").$type<
    {
      platform: "LinkedIn" | "GitHub" | "Twitter" | "Portfolio" | "Other";
      handle?: string;
      url?: string;
    }[]
  >(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const userApikeys = pgTable("apikey", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  expiresAt: timestamp("expiresAt", { mode: "date" }),
  revoked: boolean("revoked").default(false).notNull(),
  dailyLimit: integer("dailyLimit").default(3).notNull(),
  dailyUsageCount: integer("dailyUsageCount").default(0).notNull(),
  usageResetAt: timestamp("usageResetAt", { mode: "date" }),
});

export const apikeyUsageLogs = pgTable("apikeyUsageLog", {
  id: text("id").primaryKey(),
  apikeyId: text("apikeyId")
    .notNull()
    .references(() => userApikeys.id, { onDelete: "cascade" }),
  usedAt: timestamp("usedAt", { mode: "date" }).defaultNow().notNull(),
  endpoint: text("endpoint"),
  status: text("status"),
});

export const formFilledLogs = pgTable("formfilledlogs", {
  formId: text("formId").primaryKey(),
  formFilledAt: timestamp("filledAt", { mode: "date" }).defaultNow(),
  success: boolean("success"),
  personaIdUsed: text("personaIdUsed").references(() => persona.personaId, {
    onDelete: "cascade",
  }),
});

export const personaReqs = pgTable("personaRequest", {
  requestId: text("requestId").primaryKey(),
  personaId: text("personaIdReqs")
    .notNull()
    .references(() => persona.personaId, { onDelete: "cascade" }),
});

export const updationTickets = pgTable("updationTickets", {
  ticketId: text("ticketId").primaryKey(),
  ticketType: text("tickettype").default("updationofbody"),
});
