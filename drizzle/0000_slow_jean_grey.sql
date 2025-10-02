CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "apikeyUsageLog" (
	"id" text PRIMARY KEY NOT NULL,
	"apikeyId" text NOT NULL,
	"usedAt" timestamp DEFAULT now() NOT NULL,
	"endpoint" text,
	"status" text
);
--> statement-breakpoint
CREATE TABLE "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "formfilledlogs" (
	"formId" text PRIMARY KEY NOT NULL,
	"filledAt" timestamp DEFAULT now(),
	"success" boolean,
	"personaIdUsed" text
);
--> statement-breakpoint
CREATE TABLE "persona" (
	"personaId" text PRIMARY KEY NOT NULL,
	"personaName" text NOT NULL,
	"id" text,
	"name" text,
	"email" text,
	"image" text,
	"personadescription" text,
	"docs" text,
	"summary" text,
	"addresses" json
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "apikey" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"expiresAt" timestamp,
	"revoked" boolean DEFAULT false NOT NULL,
	"dailyLimit" integer DEFAULT 3 NOT NULL,
	"dailyUsageCount" integer DEFAULT 0 NOT NULL,
	"usageResetAt" timestamp,
	CONSTRAINT "apikey_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"password" text,
	"image" text,
	"razorpaySubscriptionId" text,
	"subscriptionStartedAt" timestamp,
	"subscriptionExpiresAt" timestamp,
	"subscriptionPlan" text DEFAULT 'free' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "apikeyUsageLog" ADD CONSTRAINT "apikeyUsageLog_apikeyId_apikey_id_fk" FOREIGN KEY ("apikeyId") REFERENCES "public"."apikey"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formfilledlogs" ADD CONSTRAINT "formfilledlogs_personaIdUsed_persona_personaId_fk" FOREIGN KEY ("personaIdUsed") REFERENCES "public"."persona"("personaId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "persona" ADD CONSTRAINT "persona_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "apikey" ADD CONSTRAINT "apikey_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;