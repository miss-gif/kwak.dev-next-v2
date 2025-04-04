"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  const toggleTodoStatus = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const completedTodosCount = todos.filter((t) => t.completed).length;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        할 일 목록
      </h1>

      <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />

      <TodoList
        todos={todos}
        onToggle={toggleTodoStatus}
        onDelete={deleteTodo}
      />

      {todos.length > 0 && (
        <TodoStats total={todos.length} completed={completedTodosCount} />
      )}
    </div>
  );
}

function TodoInput({
  newTodo,
  setNewTodo,
  addTodo,
}: {
  newTodo: string;
  setNewTodo: (value: string) => void;
  addTodo: () => void;
}) {
  return (
    <div className="flex mb-6">
      <Input
        type="text"
        placeholder="할 일을 입력하세요"
        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addTodo()}
      />
      <Button
        onClick={addTodo}
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        추가
      </Button>
    </div>
  );
}

function TodoList({
  todos,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <ul className="space-y-2">
      {todos.length === 0 ? (
        <li className="text-gray-500 text-center py-4">할 일이 없습니다</li>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </ul>
  );
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <li className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 mr-2"
      />
      <span
        className={`flex-grow ${
          todo.completed ? "line-through text-gray-500" : "text-gray-800"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700"
        aria-label="삭제"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  );
}

function TodoStats({ total, completed }: { total: number; completed: number }) {
  return (
    <div className="mt-6 text-sm text-gray-600">
      <p>
        총 {total}개의 할 일, {completed}개 완료
      </p>
    </div>
  );
}
