import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerPlayerRoutes } from "./player-routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup API routes
  
  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Register player and leaderboard routes
  await registerPlayerRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
