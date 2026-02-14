export const MIN_LENGTH = 3;
export const MAX_LENGTH = 50;

export function validateTodoText(text: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = text.trim();

  if (trimmed.length < MIN_LENGTH) {
    return {
      valid: false,
      error: `Todo must be at least ${MIN_LENGTH} characters longs.`,
    };
  }

  if (trimmed.length > MAX_LENGTH) {
    return {
      valid: false,
      error: `Todo must be no more than ${MAX_LENGTH} characters long.`,
    };
  }

  const forbiddenWords = ["spam", "badword"];
  if (forbiddenWords.some((word) => trimmed.toLowerCase().includes(word))) {
    return {
      valid: false,
      error: "Todo contains forbidden content",
    };
  }

  return { valid: true };
}
