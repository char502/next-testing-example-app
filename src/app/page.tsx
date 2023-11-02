'use client';
// In this app, everything is in the client
// When you set the parent component to a client component
// then you don't really need to do that for the child components

import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import { useState } from 'react';
import type { Todo } from '@/types/Todo';

export default function Home() {
  // Can only use state in a client component so ts knows this is a client component
  const [todos, setTodos] = useState<Todo[]>([
    {
      userId: 1,
      title: 'Wave hello! 👋',
      completed: false,
      id: 1,
    },
    {
      userId: 1,
      title: 'Get Coffee ☕☕☕',
      completed: false,
      id: 2,
    },
    {
      userId: 1,
      title: 'Go to Work ⚒',
      completed: false,
      id: 3,
    },
    {
      userId: 1,
      title: 'Write Code 💻',
      completed: false,
      id: 4,
    },
  ]);

  return (
    <>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}
