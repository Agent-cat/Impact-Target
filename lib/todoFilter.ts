import { Todo } from "./todoStore";

export type FilterType = "all" | "active" | "completed";

export function filterTodos(todos: Todo[], filter: FilterType): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
    case "all":
    default:
      return todos;
  }

}

export function sortTodosByDate(todos: Todo[], ascending: boolean = true): Todo[] {
  return [...todos].sort((a, b) => {
    return ascending ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
  });
}
