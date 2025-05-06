import { apiRequest } from './queryClient';
import type { InsertPlayer, InsertGameScore, GameScore, Player } from '../../../shared/schema';

interface LeaderboardEntry extends GameScore {
  player: Player;
}

// Create a new player
export async function createPlayer(name: string): Promise<Player> {
  const data: InsertPlayer = { name };
  return await apiRequest<Player>('/api/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

// Submit a game score
export async function submitScore(scoreData: InsertGameScore): Promise<GameScore> {
  return await apiRequest<GameScore>('/api/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(scoreData),
  });
}

// Get leaderboard data
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  return await apiRequest<LeaderboardEntry[]>('/api/leaderboard', {
    method: 'GET'
  });
}