'use client';

import React, { useState, useEffect } from 'react';
import { MatchmakingPlayer } from '@/utils/game';
import { soundManager, vibrateClick } from '@/utils/sound';

interface MatchmakingLobbyProps {
  onBack: () => void;
  onMatchFound: (opponent: string) => void;
  currentAddress?: string;
}

export default function MatchmakingLobby({ onBack, onMatchFound, currentAddress }: MatchmakingLobbyProps) {
  const [players, setPlayers] = useState<MatchmakingPlayer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [waitTime, setWaitTime] = useState(0);

  useEffect(() => {
    // Mock matchmaking - in production, use WebSocket or polling
    const mockPlayers: MatchmakingPlayer[] = [
      {
        address: '0x1234...5678',
        username: 'CryptoKing',
        wins: 15,
        losses: 8,
        isReady: true,
      },
      {
        address: '0xabcd...ef01',
        username: 'TicTacPro',
        wins: 23,
        losses: 12,
        isReady: true,
      },
      {
        address: '0x9876...4321',
        username: 'ChainMaster',
        wins: 8,
        losses: 5,
        isReady: false,
      },
    ];
    setPlayers(mockPlayers);
  }, []);

  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setWaitTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSearching]);

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    soundManager.playClick();
    vibrateClick();
    if (!isSearching) {
      setWaitTime(0);
      // Simulate match found after 3-5 seconds
      const delay = Math.random() * 2000 + 3000;
      setTimeout(() => {
        if (players.length > 0) {
          const randomPlayer = players[Math.floor(Math.random() * players.length)];
          soundManager.playMatchFound();
          vibrateClick();
          onMatchFound(randomPlayer.address);
        }
      }, delay);
    }
  };

  const handleChallenge = (opponent: MatchmakingPlayer) => {
    soundManager.playClick();
    vibrateClick();
    onMatchFound(opponent.address);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-carton-100 via-carton-200 to-carton-300">
      <div className="w-full max-w-2xl">
        <div className="bg-gradient-to-br from-carton-50 to-carton-100 rounded-2xl shadow-2xl p-8 border-4 border-carton-400">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onBack}
              className="bg-carton-300 hover:bg-carton-400 text-carton-800 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-carton-800">Matchmaking</h2>
            <div className="w-20"></div>
          </div>

          <div className="mb-6 text-center">
            <button
              onClick={handleSearchToggle}
              className={`
                px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105
                ${
                  isSearching
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white animate-glow-pulse'
                    : 'bg-gradient-to-r from-carton-500 to-carton-600 hover:from-carton-600 hover:to-carton-700 text-white'
                }
              `}
            >
              {isSearching ? `Searching... ${waitTime}s` : 'Quick Match'}
            </button>
          </div>

          <div className="bg-carton-200 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-bold text-carton-800 mb-3">Players Online ({players.length})</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {players.map((player, index) => (
                <div
                  key={index}
                  className="bg-carton-100 rounded-lg p-4 flex items-center justify-between border-2 border-carton-300 hover:border-carton-400 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-carton-800">{player.username}</span>
                      {player.isReady && (
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      )}
                    </div>
                    <div className="text-sm text-carton-600">{player.address}</div>
                    <div className="text-xs text-carton-500 mt-1">
                      {player.wins}W - {player.losses}L
                    </div>
                  </div>
                  <button
                    onClick={() => handleChallenge(player)}
                    disabled={!player.isReady}
                    className={`
                      px-4 py-2 rounded-lg font-semibold transition-all
                      ${
                        player.isReady
                          ? 'bg-carton-500 hover:bg-carton-600 text-white cursor-pointer'
                          : 'bg-carton-300 text-carton-500 cursor-not-allowed'
                      }
                    `}
                  >
                    Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-carton-600">
            <p>Gas-sponsored matches available • 1 USDC entry fee per player</p>
          </div>
        </div>
      </div>
    </div>
  );
}
