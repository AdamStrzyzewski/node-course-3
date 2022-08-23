const pow = require("./pow");

describe("power", () => {
  beforeAll(() => {
    // przed wszystkimi testami
  });

  afterAll(() => {
    // po wszystkich testach
  });

  beforeEach(() => {
    // przed każdym testem
  });

  afterEach(() => {
    // po każdym teście
  });

  test("1 to power of 2 equals 1", () => {
    expect(pow(1, 2)).toBe(1);
  });

  test("3 to power of 2 equals 9", () => {
    expect(pow(3, 2)).toBe(9);
  });

  test("3 to power of X equals NaN", () => {
    expect(pow(3, "X")).toBe(NaN);
  });
});
