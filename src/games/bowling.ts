// function main() {
interface Bowling {
  // Called each time the player rolls a ball. The argument is the number of pins knocked down
  roll(noOfPins: number): void;

  // Returns the total score of the game
  score(): number;
}

// OOP - Class based implementation
export default class Game implements Bowling {
  private currentScore: number = 0;
  // Each frame holds its own cumulative score
  private frames: number[] = Array.from({ length: 10 }, () => 0);
  // How many rolls (gets +2 for strike - skipped roll)
  private rolls: number = 0;
  private rollValues: number[] = [];
  private currentFrame: number = 0;

  // [rollToAddBonusTo, [rollsToTakeValuesFrom]]
  private bonusesFromRolls = new Map<number, number[]>();

  roll(noOfPins: number): void {
    if (noOfPins < 0 || noOfPins > 10) {
      console.error('Invalid roll value!');
      return;
    }

    // Prevent rolls after game is complete (10 frames finished)
    if (this.currentFrame > 9) {
      console.error('Game has finished!');
      return;
    }

    this.rollValues.push(noOfPins);
    this.frames[this.currentFrame] += noOfPins;

    const isFirstBall = this.rolls % 2 === 0;
    const isSecondBall = this.rolls % 2 === 1;

    // isOdd and is 10 pins
    const isStrike = isFirstBall && noOfPins === 10;

    // isEven and total is 10
    const isSpare = isSecondBall && this.frames[this.currentFrame] === 10;

    // Frames 1-9
    if (this.currentFrame < 9) {
      if (isStrike) {
        // Setup next 2 roll scores to be added to the current frame
        this.bonusesFromRolls.set(this.currentFrame, [
          this.rolls + 1,
          this.rolls + 2,
        ]);
        this.rolls++; // Skip second roll
        this.currentFrame++;
      } else if (isSpare) {
        // Setup next 1 roll scores to be added to the current frame
        this.bonusesFromRolls.set(this.currentFrame, [this.rolls + 1]);
        this.currentFrame++;
      } else if (isSecondBall) {
        this.currentFrame++;
      }
    }

    // 10th frame
    else {
      if (isStrike && isFirstBall) {
        this.rolls++; // Allow 2 more rolls
      } else if (
        isSecondBall &&
        !isSpare &&
        this.rollValues[this.rolls - 1] !== 10
      ) {
        this.currentFrame++; // End game if no spare/strike
      }
    }

    this.rolls++;

    // Calculate base score
    this.currentScore = this.frames.reduce((acc, curr) => acc + curr, 0);

    // Add bonuses for strikes and spares
    this.bonusesFromRolls.forEach((bonusRolls) => {
      // For each bonus roll index, add that roll's value to the current score
      bonusRolls.forEach((rollIndex) => {
        // Only add bonus if the roll has been made
        if (rollIndex < this.rollValues.length) {
          this.currentScore += this.rollValues[rollIndex];
        }
      });
    });
  }

  score() {
    return this.currentScore;
  }
}

// Functional - Closure based implementation
export function createBowlingGame(): Bowling {
  let currentScore = 0;
  let frames = Array.from({ length: 10 }, () => 0);
  let rolls = 0;
  let rollValues: number[] = [];
  let currentFrame = 0;
  let bonusesFromRolls = new Map<number, number[]>();

  function roll(noOfPins: number): void {
    if (noOfPins < 0 || noOfPins > 10) {
      console.error('Invalid roll value!');
      return;
    }

    if (currentFrame > 9) {
      console.error('Game has finished!');
      return;
    }

    rollValues.push(noOfPins);
    frames[currentFrame] += noOfPins;

    const isFirstBall = rolls % 2 === 0;
    const isSecondBall = rolls % 2 === 1;
    const isStrike = isFirstBall && noOfPins === 10;
    const isSpare = isSecondBall && frames[currentFrame] === 10;

    if (currentFrame < 9) {
      if (isStrike) {
        bonusesFromRolls.set(currentFrame, [rolls + 1, rolls + 2]);
        rolls++;
        currentFrame++;
      } else if (isSpare) {
        bonusesFromRolls.set(currentFrame, [rolls + 1]);
        currentFrame++;
      } else if (isSecondBall) {
        currentFrame++;
      }
    } else {
      if (isStrike && isFirstBall) {
        rolls++;
      } else if (
        isSecondBall &&
        !isSpare &&
        rollValues[rolls - 1] !== 10
      ) {
        currentFrame++;
      }
    }

    rolls++;

    currentScore = frames.reduce((acc, curr) => acc + curr, 0);

    bonusesFromRolls.forEach((bonusRolls) => {
      bonusRolls.forEach((rollIndex) => {
        if (rollIndex < rollValues.length) {
          currentScore += rollValues[rollIndex];
        }
      });
    });
  }

  function score(): number {
    return currentScore;
  }

  return { roll, score };
}