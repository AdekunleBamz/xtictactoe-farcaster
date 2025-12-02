'use client';

import React, { useState } from 'react';
import ModeSelector from '@/components/ModeSelector';
import GameBoard from '@/components/GameBoard';
import MatchmakingLobby from '@/components/MatchmakingLobby';
import WaitingRoom from '@/components/WaitingRoom';
import Leaderboard from '@/components/Leaderboard';
import WalletButton from '@/components/WalletButton';
import { GameMode, AIDifficulty } from '@/utils/game';
import { soundManager, vibrateClick } from '@/utils/sound';

type Screen = 'menu' | 'game' | 'matchmaking' | 'waiting' | 'leaderboard';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [mode, setMode] = useState<GameMode>('ai');
  const [difficulty, setDifficulty] = useState<AIDifficulty>('medium');
  const [opponent, setOpponent] = useState<string>('');
  const [gameId, setGameId] = useState<bigint | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSelectMode = (selectedMode: GameMode) => {
    setMode(selectedMode);
    if (selectedMode === 'ai') {
      setScreen('game');
    } else {
      setScreen('matchmaking');
    }
  };

  const handleMatchFound = (opponentAddress: string) => {
    setOpponent(opponentAddress);
    setScreen('waiting');
  };

  const handleGameStart = (id: bigint) => {
    setGameId(id);
    setScreen('game');
  };

  const handleBack = () => {
    setScreen('menu');
    setOpponent('');
    setGameId(null);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundManager.setEnabled(newState);
    soundManager.playClick();
    vibrateClick();
  };

  const showLeaderboard = () => {
    setScreen('leaderboard');
    soundManager.playClick();
    vibrateClick();
  };

  return (
    <main className="relative">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleSound}
          className="bg-carton-400 hover:bg-carton-500 text-white font-bold p-3 rounded-lg shadow-lg transition-all"
          title={soundEnabled ? 'Mute' : 'Unmute'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        {screen === 'menu' && (
          <button
            onClick={showLeaderboard}
            className="bg-carton-400 hover:bg-carton-500 text-white font-bold p-3 rounded-lg shadow-lg transition-all"
            title="Leaderboard"
          >
            🏆
          </button>
        )}
        <WalletButton />
      </div>

      {screen === 'menu' && (
        <ModeSelector
          onSelectMode={handleSelectMode}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
      )}

      {screen === 'game' && (
        <GameBoard
          mode={mode}
          difficulty={difficulty}
          onBack={handleBack}
        />
      )}

      {screen === 'matchmaking' && (
        <MatchmakingLobby
          onBack={handleBack}
          onMatchFound={handleMatchFound}
          currentAddress={undefined}
        />
      )}

      {screen === 'waiting' && (
        <WaitingRoom
          opponent={opponent}
          onBack={handleBack}
          onGameStart={handleGameStart}
          isCreator={true}
        />
      )}

      {screen === 'leaderboard' && (
        <Leaderboard
          onBack={handleBack}
          currentAddress={undefined}
        />
      )}
    </main>
  );
}
