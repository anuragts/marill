CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" varchar,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
