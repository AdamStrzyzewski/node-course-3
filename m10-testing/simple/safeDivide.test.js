const safeDivide = require("./safeDivide");

describe("safeDivide", () => {
  test("1 / 2 equals 0.5", () => {
    expect(safeDivide(1, 2)).toBe(0.5);
  });

  test("1 / 0 equals 0", () => {
    expect(safeDivide(1, 0)).toBe(0);
  });
});
