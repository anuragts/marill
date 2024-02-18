import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: varchar("name"),
});

export const pdf = pgTable("pdf", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  chatId: serial("chat_id").references(() => chats.id),
  userId: serial("user_id").references(() => users.id),
  filePath: text("file_path").notNull(),
});

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  userId: serial("user_id").references(() => users.id),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(),
  chatId: serial("chat_id").references(() => chats.id),
});
