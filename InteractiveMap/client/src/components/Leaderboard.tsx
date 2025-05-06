import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '../lib/api';
import { formatTime } from '../lib/utils';

export default function Leaderboard() {
  const { data: leaderboard, isLoading, error } = useQuery({
    queryKey: ['/api/leaderboard'],
    queryFn: getLeaderboard
  });

  if (isLoading) {
    return (
      <div className="text-center p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-200 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        <p>Failed to load leaderboard. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Top Players</h2>
      
      <div className="bg-white bg-opacity-60 rounded-lg overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-12 gap-2 p-3 border-b border-gray-200 font-medium text-gray-700 bg-gray-50">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-4">Player</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-3 text-center">Accuracy</div>
          <div className="col-span-2 text-center">Time</div>
        </div>
        
        {/* Data rows */}
        {leaderboard && leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <div 
              key={entry.id} 
              className={`grid grid-cols-12 gap-2 p-3 border-b border-gray-100 ${index === 0 ? 'bg-yellow-50' : index === 1 ? 'bg-gray-50' : index === 2 ? 'bg-amber-50' : ''}`}
            >
              <div className="col-span-1 font-bold text-center">
                {index + 1}
              </div>
              <div className="col-span-4 font-medium truncate">{entry.player.name}</div>
              <div className="col-span-2 text-center">{entry.correctAnswers}/{entry.totalAttempts}</div>
              <div className="col-span-3 text-center">{entry.percentage}%</div>
              <div className="col-span-2 text-center">{formatTime(entry.timeElapsed)}</div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No scores yet. Be the first to play!
          </div>
        )}
      </div>
    </div>
  );
}