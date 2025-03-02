import { drizzle } from "drizzle-orm/postgres-js";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(username: string) {
  const users = await ensureTableExists();
  return await db.select().from(users).where(eq(users.username, username));
}

export async function createUser(username: string, password: string) {
  const users = await ensureTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ username, password: hash });
}

async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(64),
        password VARCHAR(64),
        email VARCHAR(64),
        firstname VARCHAR(64),
        lastname VARCHAR(64),
        salutation VARCHAR(10),
        image VARCHAR(256),
        address VARCHAR(256),
        country_code VARCHAR(64),
        postal_code VARCHAR(10),
        gender VARCHAR(2),
        marital_status VARCHAR(10),
        spouse_firstname VARCHAR(64),
        spouse_lastname VARCHAR(64),
        spouse_salutation VARCHAR(10),
        sports VARCHAR(256),
        music VARCHAR(256),
        show VARCHAR(256),
      );`;
  }

  const table = pgTable("User", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 64 }),
    password: varchar("password", { length: 64 }),
    email: varchar("email", { length: 64 }),
    firstname: varchar("firstname", { length: 64 }),
    lastname: varchar("lastname", { length: 64 }),
    salutation: varchar("salutation", { length: 10 }),
    image: varchar("lastname", { length: 256 }),
    address: varchar("address", { length: 256 }),
    country_code: varchar("country_code", { length: 10 }),
    postal_code: varchar("postal_code", { length: 10 }),
    gender: varchar("gender", { length: 2 }),
    marital_status: varchar("marital_status", { length: 10 }),
    spouse_firstname: varchar("spouse_firstname", { length: 64 }),
    spouse_lastname: varchar("spouse_lastname", { length: 64 }),
    spouse_salutation: varchar("spouse_salutation", { length: 10 }),
    sports: varchar("sports", { length: 256 }),
    music: varchar("music", { length: 256 }),
    shows: varchar("shows", { length: 256 }),
  });

  return table;
}
