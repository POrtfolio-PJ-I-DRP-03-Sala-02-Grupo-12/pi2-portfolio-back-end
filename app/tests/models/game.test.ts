import sum from '../mocks/sum';

describe("If you see it, means that works", () => {
  it("adds 5 + 4 to equal 9", () => {
    expect(sum(5, 4)).toEqual(9);
  });
});