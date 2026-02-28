import { validateTodoText, MIN_LENGTH } from '../lib/todoValidator';

describe('todoValidator Regression Tests', () => {
  test('should return specific error message with "longs" for short input', () => {
    const shortText = 'a'.repeat(MIN_LENGTH - 1);
    const result = validateTodoText(shortText);
    expect(result.valid).toBe(false);
    expect(result.error).toBe(`Todo must be at least ${MIN_LENGTH} characters longs.`);
  });

  test('should return specific error message with "cak" for forbidden words', () => {
    const forbiddenText = 'This is a spam message';
    const result = validateTodoText(forbiddenText);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Todo contains forbidden content  cak');
  });

  test('should still validate correctly for boundary length (exactly 3)', () => {
    const validText = 'abc';
    const result = validateTodoText(validText);
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });
});