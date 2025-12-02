'use client';

import React, { useState, useEffect } from 'react';
import { Player, Board, checkWinner, checkDraw, getAIMove, AIDifficulty } from '@/utils/game';
import { soundManager, vibrateMove, vibrateWin, vibrateLose } from '@/utils/sound';

interface GameBoardProps {
  mode: 'ai' | 'pvp';
  difficulty: AIDifficulty;
  onBack: () => void;
  onWin?: (winner: Player) => void;
}

export default function GameBoard({ mode, difficulty, onBack, onWin }: GameBoardProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    if (mode === 'ai' && currentPlayer === 'O' && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const move = getAIMove([...board], difficulty);
        if (move !== -1) {
          handleMove(move);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, mode, winner, isDraw, board, difficulty]);

  useEffect(() => {
    const result = checkWinner(board);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.winningLine);
      if (result.winner === 'X') {
        soundManager.playWin();
        vibrateWin();
      } else {
        soundManager.playLose();
        vibrateLose();
      }
      if (onWin) onWin(result.winner);
    } else if (checkDraw(board)) {
      setIsDraw(true);
      soundManager.playDraw();
    }
  }, [board, onWin]);

  const handleMove = (index: number) => {
    if (board[index] || winner || isDraw) return;
    if (mode === 'ai' && currentPlayer === 'O') return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    soundManager.playMove();
    vibrateMove();
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    soundManager.playClick();
  };

  const isWinningCell = (index: number) => {
    return winningLine?.includes(index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-carton-100 via-carton-200 to-carton-300">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-carton-50 to-carton-100 rounded-2xl shadow-2xl p-8 border-4 border-carton-400">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onBack}
              className="bg-carton-300 hover:bg-carton-400 text-carton-800 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-carton-800">
              {mode === 'ai' ? '🤖 AI Mode' : '⚔️ PvP Mode'}
            </h2>
            <button
              onClick={handleReset}
              className="bg-carton-300 hover:bg-carton-400 text-carton-800 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              🔄
            </button>
          </div>

          <div className="mb-6 text-center">
            {winner ? (
              <p className="text-2xl font-bold text-carton-800 animate-bounce-in">
                {winner === 'X' ? '🎉 You Win!' : '😔 You Lose!'}
              </p>
            ) : isDraw ? (
              <p className="text-2xl font-bold text-carton-700">🤝 Draw!</p>
            ) : (
              <p className="text-xl text-carton-700">
                {currentPlayer === 'X' ? 'Your Turn' : mode === 'ai' ? 'AI Thinking...' : 'Opponent Turn'}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleMove(index)}
                disabled={!!cell || !!winner || isDraw || (mode === 'ai' && currentPlayer === 'O')}
                className={`
                  aspect-square bg-gradient-to-br from-carton-200 to-carton-300 
                  rounded-xl shadow-lg hover:shadow-xl
                  flex items-center justify-center text-5xl font-bold
                  transition-all duration-200 transform hover:scale-105
                  border-2 border-carton-400
                  ${cell ? 'cursor-default' : 'cursor-pointer'}
                  ${isWinningCell(index) ? 'animate-cell-win bg-gradient-to-br from-carton-400 to-carton-500' : ''}
                  ${!cell && !winner && !isDraw ? 'hover:bg-gradient-to-br hover:from-carton-300 hover:to-carton-400' : ''}
                `}
              >
                {cell && (
                  <span className={`animate-bounce-in ${cell === 'X' ? 'text-carton-800' : 'text-carton-700'}`}>
                    {cell}
                  </span>
                )}
              </button>
            ))}
          </div>

          {mode === 'ai' && (
            <div className="text-center text-sm text-carton-600">
              Difficulty: <span className="font-bold text-carton-800 capitalize">{difficulty}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
