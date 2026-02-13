export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export class TodoStore {
  private todos: Todo[] = [];

  addTodo(text: string): Todo {
    const todo: Todo = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    this.todos.push(todo);
    return todo;
  }

  toggleTodo(id: string): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((t) => !t.completed);
  }

  getTodos(): Todo[] {
    return [...this.todos];
  }
}
