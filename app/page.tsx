"use client";

import { useState, useEffect } from "react";
import { Todo, TodoStore } from "@/lib/todoStore";
import { filterTodos, FilterType } from "@/lib/todoFilter";
import { validateTodoText } from "@/lib/todoValidator";

const store = new TodoStore();

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    updateTodos();
  }, []);

  const updateTodos = () => {
    setTodos(store.getTodos());
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTodoText(inputText);
    if (!validation.valid) {
      setError(validation.error!);
      return;
    }

    store.addTodo(inputText);
    setInputText("");
    setError(null);
    updateTodos();
  };

  const handleToggle = (id: string) => {
    store.toggleTodo(id);
    updateTodos();
  };

  const handleRemove = (id: string) => {
    store.removeTodo(id);
    updateTodos();
  };

  const handleClearCompleted = () => {
    store.clearCompleted();
    updateTodos();
  };

  const filteredTodos = filterTodos(todos, filter);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4 font-sans text-gray-900">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Tasks</h1>
          <p className="text-gray-500 mt-2">Manage your daily objectives.</p>
        </header>

        <form onSubmit={handleAdd} className="mb-8">
          <div className="relative group">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-500/50 focus:bg-white transition-all outline-none text-gray-700 font-medium placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 active:scale-95 transition-all text-sm"
            >
              Add
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-500 font-medium ml-1">{error}</p>}
        </form>

        <div className="flex gap-2 mb-8 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
          {(["all", "active", "completed"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold capitalize transition-all ${
                filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3 min-h-[300px]">
          {filteredTodos.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-20 text-center opacity-40">
              <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm font-medium">No tasks found</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="group flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div
                  onClick={() => handleToggle(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all ${
                    todo.completed ? "bg-green-500 border-green-500" : "border-gray-200 group-hover:border-gray-300"
                  }`}
                >
                  {todo.completed && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className={`flex-1 font-medium transition-all ${
                    todo.completed ? "text-gray-300 line-through" : "text-gray-700"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleRemove(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {todos.some((t) => t.completed) && (
          <button
            onClick={handleClearCompleted}
            className="w-full mt-6 py-4 text-sm font-bold text-gray-500 border-2 border-dashed border-gray-100 rounded-xl hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all"
          >
            Clear Completed
          </button>
        )}
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm font-medium">
        Target Project • Protected by AI Impact Analysis
      </div>
    </div>
  );
}
