import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Add player schema for the game
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPlayerSchema = createInsertSchema(players).pick({
  name: true,
});

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;

// Add game score schema to track player performance
export const gameScores = pgTable("game_scores", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id").notNull().references(() => players.id),
  correctAnswers: integer("correct_answers").notNull(),
  totalAttempts: integer("total_attempts").notNull(),
  timeElapsed: integer("time_elapsed").notNull(), // time in seconds
  percentage: integer("percentage").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGameScoreSchema = createInsertSchema(gameScores).pick({
  playerId: true,
  correctAnswers: true,
  totalAttempts: true,
  timeElapsed: true,
  percentage: true,
});

export type InsertGameScore = z.infer<typeof insertGameScoreSchema>;
export type GameScore = typeof gameScores.$inferSelect;

// Define relations
export const playersRelations = relations(players, ({ many }) => ({
  scores: many(gameScores),
}));

export const gameScoresRelations = relations(gameScores, ({ one }) => ({
  player: one(players, {
    fields: [gameScores.playerId],
    references: [players.id],
  }),
}));

// Map data schemas if we would need to store locations in the database
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  coordinates: jsonb("coordinates").$type<[number, number]>().notNull(),
  category: text("category").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  hours: text("hours").notNull(),
  details: text("details").notNull(),
});

export const insertLocationSchema = createInsertSchema(locations).pick({
  title: true,
  description: true,
  coordinates: true,
  category: true,
  address: true,
  phone: true,
  hours: true,
  details: true,
});

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;
