import { useCallback, useRef, useState } from 'react';

import Game from '@/games/bowling';

const Bowling = () => {
  // const gameRef = useRef(createBowlingGame()); // Functional
  const gameRef = useRef(new Game()); // OOP

  const [currentRoll, setCurrentRoll] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState(gameRef.current.score());

  const handleHasRolled = useCallback((noOfPins: number) => {
    gameRef.current.roll(noOfPins);

    setCurrentRoll(0);
    setCurrentScore(gameRef.current.score());
  }, []);

  return (
    <div className="max-w-96 p-4">
      <p className="mb-3 text-lg">Current score {currentScore}</p>

      <div className="flex flex-col gap-2">
        <input
          min="0"
          max="10"
          onChange={(e) => setCurrentRoll(Number(e.currentTarget.value))}
          value={currentRoll}
          className="rounded border px-3 py-2"
        />
        <button
          className="rounded border bg-white px-5 py-2 text-black"
          onClick={() => handleHasRolled(currentRoll)}
        >
          Roll
        </button>
      </div>
    </div>
  );
};

export default Bowling;
