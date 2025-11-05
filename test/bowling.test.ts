import Game from '@/bowling.ts';
describe('Ensures bowling games is correct', () => {
  // GENERIC TEST CASES \\
  it('Should have a score of 0 at the beginning of a game', () => {
    const game = new Game();

    expect(game.score()).toBe(0);
  });

  it('Should have a score of 10 when 4 | 6 is rolled', () => {
    const game = new Game();

    game.roll(4);
    game.roll(6);

    expect(game.score()).toBe(10);
  });

  it('Should calculate the spare correctly', () => {
    const game = new Game();

    game.roll(4);
    game.roll(6);

    expect(game.score()).toBe(10);

    game.roll(5);
    game.roll(1);

    expect(game.score()).toBe(21);
  });

  it('Should calculate the strike correctly', () => {
    const game = new Game();

    game.roll(10);

    expect(game.score()).toBe(10);

    game.roll(5);
    game.roll(4);

    expect(game.score()).toBe(28);
  });

  // EDGE CASES AND MALFORMED INPUTS \\
  it('Should not allow rolls after 10 frames are complete', () => {
    const game = new Game();

    // Roll 10 normal frames (no strikes or spares)
    for (let i = 0; i < 10; i++) {
      game.roll(4);
      game.roll(3);
    }

    const scoreAfter10Frames = game.score();
    expect(scoreAfter10Frames).toBe(70);

    // Try to roll more - should not affect score
    game.roll(5);
    game.roll(5);

    expect(game.score()).toBe(70);
  });

  it('Should not allow roll inputs under 0 and over 10 pins', () => {
    const game = new Game();

    game.roll(15);

    expect(game.score()).toBe(0);
  });
});
