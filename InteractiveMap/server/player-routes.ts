import { Express, Request, Response } from "express";
import { db } from "./db";
import { players, gameScores, insertPlayerSchema, insertGameScoreSchema } from "../shared/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export async function registerPlayerRoutes(app: Express) {
  // Create a new player
  app.post("/api/players", async (req: Request, res: Response) => {
    try {
      const playerData = insertPlayerSchema.parse(req.body);
      const newPlayer = await db.insert(players).values(playerData).returning();
      res.json(newPlayer[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error creating player:", error);
        res.status(500).json({ error: "Failed to create player" });
      }
    }
  });

  // Submit a game score
  app.post("/api/scores", async (req: Request, res: Response) => {
    try {
      const scoreData = insertGameScoreSchema.parse(req.body);
      const newScore = await db.insert(gameScores).values(scoreData).returning();
      res.json(newScore[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error saving score:", error);
        res.status(500).json({ error: "Failed to save score" });
      }
    }
  });

  // Get leaderboard (top 10 scores by percentage and time)
  app.get("/api/leaderboard", async (_req: Request, res: Response) => {
    try {
      const leaderboardData = await db.query.gameScores.findMany({
        with: {
          player: true
        },
        orderBy: [
          desc(gameScores.percentage),
          gameScores.timeElapsed
        ],
        limit: 10
      });
      
      res.json(leaderboardData);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });
}