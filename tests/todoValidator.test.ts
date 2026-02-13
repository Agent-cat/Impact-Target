import { validateTodoText } from "../lib/todoValidator";

describe("todoValidator", () => {
  test("should accept valid text", () => {
    const result = validateTodoText("Complete the project");
    expect(result.valid).toBe(true);
  });

  test("should reject short text", () => {
    const result = validateTodoText("Hi");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("at least 3 characters");
  });

  test("should reject long text", () => {
    const result = validateTodoText("a".repeat(51));
    expect(result.valid).toBe(false);
    expect(result.error).toContain("no more than 50 characters");
  });

  test("should reject forbidden words", () => {
    const result = validateTodoText("This is spam");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("forbidden");
  });

  test("should trim whitespace before validation", () => {
    const result = validateTodoText("  OK  ");
    expect(result.valid).toBe(false); // "OK" is 2 chars
  });
});
