import { filterTodos, sortTodosByDate } from "../lib/todoFilter";
import { Todo } from "../lib/todoStore";

const mockTodos: Todo[] = [
  { id: "1", text: "Task 1", completed: false, createdAt: 100 },
  { id: "2", text: "Task 2", completed: true, createdAt: 200 },
  { id: "3", text: "Task 3", completed: false, createdAt: 50 },
];

describe("todoFilter", () => {
  test("should filter active todo", () => {
    const result = filterTodos(mockTodos, "active");
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  test("should filter completed todo", () => {
    const result = filterTodos(mockTodos, "completed");
    expect(result).toHaveLength(1);
    expect(result[0].completed).toBe(true);
  });

  test("should return all todos for 'all' filter", () => {
    const result = filterTodos(mockTodos, "all");
    expect(result).toHaveLength(3);
  });

  test("should sort todos by date ascending", () => {
    const result = sortTodosByDate(mockTodos, true);
    expect(result[0].id).toBe("3");
    expect(result[2].id).toBe("2");
  });

  test("should sort todos by date descending", () => {
    const result = sortTodosByDate(mockTodos, false);
    expect(result[0].id).toBe("2");
    expect(result[2].id).toBe("3");
  });
});
