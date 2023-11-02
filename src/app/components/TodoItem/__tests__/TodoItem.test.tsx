import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../TodoItem';

// need a mock todo as testing this in isolation
const mockTodo = {
  userId: 1,
  title: 'Wave hello! 👋',
  completed: false,
  id: 1,
};

// need a mock setTodo as setTodo this is used in the component
// but not looking for how the setTodos works
// just want to confirm that it is called
const mockSetTodos = jest.fn();

// a describe inside a describe to organise tests within
// one to describe render and the other to describe behaviour
describe('AddTodo', () => {
  describe('Render', () => {
    it('should render an article', () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />); // ARRANGE

      //ACT
      // this can search for an element
      const article = screen.getByRole('article');

      expect(article).toBeInTheDocument(); // ASSERT
    });

    it('should render a label', () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />); // ARRANGE

      // ACT
      // can't do this as easily with a label
      // test-id is an option
      const label = screen.getByTestId('todo-item');

      expect(label).toBeInTheDocument(); // ASSERT
    });

    it('should render a checkbox', () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />); // ARRANGE

      //ACT
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument(); // ASSERT
    });

    it('should render a button', () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />); // ARRANGE

      //ACT
      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument(); // ASSERT
    });
  });

  describe('Behavior', () => {
    it('should call setTodos when checkbox clicked', async () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />); // ARRANGE

      //ACT
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);

      // This is deprecated
      //   expect(mockSetTodos).toBeCalled(); // ASSERT

      expect(mockSetTodos).toHaveBeenCalled(); // ASSERT
    });

    it('should call setTodos when button clicked', async () => {
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />); // ARRANGE

      //ACT
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // This is deprecated
      //   expect(mockSetTodos).toBeCalled(); // ASSERT

      expect(mockSetTodos).toHaveBeenCalled(); // ASSERT
    });
  });
});
