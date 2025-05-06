import React, { useState } from 'react';
import { createPlayer } from '../lib/api';
import { Player } from '../../../shared/schema';

interface PlayerFormProps {
  onPlayerCreated: (player: Player) => void;
}

export default function PlayerForm({ onPlayerCreated }: PlayerFormProps) {
  const [playerName, setPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter a name to continue');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      const player = await createPlayer(playerName);
      onPlayerCreated(player);
    } catch (err) {
      console.error('Error creating player:', err);
      setError('Failed to create player. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Enter Your Name</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={30}
              autoFocus
              disabled={isLoading}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Start Game'}
          </button>
        </form>
      </div>
    </div>
  );
}