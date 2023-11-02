import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

// need a mock list of todos to test in isolation
const mockTodos = [
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
];

// and nee to mock the setTodos function
// don't care how it works, just whether it is fired
const mockSetTodos = jest.fn();

describe('TodoList', () => {
  it('should render "No Todos Available" when the array is empty', () => {
    // what to test specific blank array scenario
    render(<TodoList todos={[]} setTodos={mockSetTodos} />); // ARRANGE

    //ACT
    const message = screen.getByText('No Todos Available');

    expect(message).toBeInTheDocument(); // ASSERT
  });

  it('should render a list with the correct number of items', () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />); // ARRANGE

    //ACT
    const todosArray = screen.getAllByRole('article');

    expect(todosArray.length).toBe(2); // ASSERT
  });

  it('should render the todos in the correct order', () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />); // ARRANGE

    //ACT
    const firstItem = screen.getAllByTestId('todo-item')[0];

    // makes sure the new todo (the most recent - in this case get coffee)
    // is on the top
    // as per the defined order in the component
    expect(firstItem).toHaveTextContent('Get Coffee ☕☕☕'); // ASSERT
  });
});
