import { TodoStore } from "../lib/todoStore";

describe("TodoStore", () => {
  let store: TodoStore;

  beforeEach(() => {
    store = new TodoStore();
  });

  test("should add a new todo", () => {
    const todo = store.addTodo("Buy milk");
    expect(todo.text).toBe("Buy milk");
    expect(todo.completed).toBe(false);
    expect(store.getTodos()).toHaveLength(1);
  });

  test("should toggle todo status", () => {
    const todo = store.addTodo("Buy milk");
    store.toggleTodo(todo.id);
    expect(store.getTodos()[0].completed).toBe(true);
    store.toggleTodo(todo.id);
    expect(store.getTodos()[0].completed).toBe(false);
  });

  test("should remove a todo", () => {
    const todo = store.addTodo("Buy milk");
    store.removeTodo(todo.id);
    expect(store.getTodos()).toHaveLength(0);
  });

  test("should clear completed todos", () => {
    const t1 = store.addTodo("A");
    const t2 = store.addTodo("B");
    store.toggleTodo(t1.id);
    store.clearCompleted();
    expect(store.getTodos()).toHaveLength(1);
    expect(store.getTodos()[0].id).toBe(t2.id);
  });
});
