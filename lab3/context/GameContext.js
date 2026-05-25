import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [challenges, setChallenges] = useState([
    { id: 1, title: 'Tap 10 times', description: 'Tap on the clicker object 10 times', target: 10, progress: 0, completed: false, type: 'tap' },
    { id: 2, title: 'Double-tap 5 times', description: 'Double-tap on the clicker 5 times', target: 5, progress: 0, completed: false, type: 'doubleTap' },
    { id: 3, title: 'Long press 3 seconds', description: 'Hold the clicker for 3 seconds', target: 1, progress: 0, completed: false, type: 'longPress' },
    { id: 4, title: 'Drag the object', description: 'Drag the clicker around the screen', target: 1, progress: 0, completed: false, type: 'drag' },
    { id: 5, title: 'Swipe right', description: 'Perform a quick swipe right gesture', target: 1, progress: 0, completed: false, type: 'swipeRight' },
    { id: 6, title: 'Swipe left', description: 'Perform a quick swipe left gesture', target: 1, progress: 0, completed: false, type: 'swipeLeft' },
    { id: 7, title: 'Pinch to resize', description: 'Use pinch gesture to resize the clicker', target: 1, progress: 0, completed: false, type: 'pinch' },
    { id: 8, title: 'Reach 100 points', description: 'Score a total of 100 points', target: 100, progress: 0, completed: false, type: 'score' },
    { id: 9, title: 'Tap 50 times', description: 'Tap on the clicker object 50 times', target: 50, progress: 0, completed: false, type: 'tap50' },
  ]);

  const updateChallenge = (type, amount = 1) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.completed) return ch;
      if (ch.type === type) {
        const newProgress = Math.min(ch.progress + amount, ch.target);
        return { ...ch, progress: newProgress, completed: newProgress >= ch.target };
      }
      return ch;
    }));
  };

  const addScore = (points) => {
    setScore(prev => {
      const newScore = prev + points;
      setChallenges(prevCh => prevCh.map(ch => {
        if (ch.completed) return ch;
        if (ch.type === 'score') {
          const newProgress = Math.min(newScore, ch.target);
          return { ...ch, progress: newProgress, completed: newProgress >= ch.target };
        }
        return ch;
      }));
      return newScore;
    });
  };

  return (
    <GameContext.Provider value={{ score, addScore, challenges, updateChallenge, isDark, setIsDark }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);