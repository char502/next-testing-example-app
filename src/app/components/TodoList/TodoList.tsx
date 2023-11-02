import TodoItem from '../TodoItem/TodoItem';
import type { Todo } from '@/types/Todo';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

// Knows parent has to be a client component as setTodos is a hook
// And hooks can only be used in client components

// Also any child of a client component also has to be a client component
export default function TodoList({ todos, setTodos }: Props) {
  let content;
  if (todos.length === 0) {
    content = <p>No Todos Available</p>;
  } else {
    const sortedTodos = todos.sort((a, b) => b.id - a.id);

    content = (
      <>
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </>
    );
  }

  return content;
}
