CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" varchar(256) NOT NULL,
	"shortDescription" varchar(128),
	"price" numeric NOT NULL,
	"discountPercentage" numeric,
	"rating" numeric,
	"stock" numeric NOT NULL,
	"category" text NOT NULL,
	"thumbnail" text NOT NULL,
	"images" text[],
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
