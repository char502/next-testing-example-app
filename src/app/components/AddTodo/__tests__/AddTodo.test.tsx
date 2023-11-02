import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodo from '../AddTodo';

// This group of tests doesn't receive the actual todos
// This is because, any time you have setTodos
// If you don't need the todos by themselves

// If you only need them in the setter
// You can reference that, in that function
// That can pull up the previous todos already
// That's react not testing library or Next.js

const mockSetTodos = jest.fn();

describe('AddTodo', () => {
  describe('Render', () => {
    it('should render the input', () => {
      render(<AddTodo setTodos={mockSetTodos} />); // ARRANGE

      const input = screen.getByPlaceholderText('New Todo'); //ACT

      expect(input).toBeInTheDocument(); // ASSERT
    });

    // Important to note the disabled part of this button
    // the enabled part is covered in the behaviour section
    it('should render a disabled submit button', () => {
      render(<AddTodo setTodos={mockSetTodos} />); // ARRANGE

      //ACT
      const button = screen.getByRole('button', {
        name: 'Submit',
      });

      // have a check for disabled status
      expect(button).toBeDisabled(); // ASSERT
    });
  });

  describe('Behavior', () => {
    it('should be able to add text to the input', async () => {
      render(<AddTodo setTodos={mockSetTodos} />); // ARRANGE

      const input = screen.getByPlaceholderText('New Todo'); //ACT
      await userEvent.type(input, 'hey there');
      expect(input).toHaveValue('hey there'); // ASSERT
    });

    it('should enable the submit button when text is input', async () => {
      render(<AddTodo setTodos={mockSetTodos} />); // ARRANGE

      const input = screen.getByPlaceholderText('New Todo'); //ACT
      await userEvent.type(input, 'hey there');

      const button = screen.getByRole('button', {
        name: 'Submit',
      });

      expect(button).toBeEnabled(); // ASSERT
    });

    it('should empty the text input when submitted', async () => {
      render(<AddTodo setTodos={mockSetTodos} />); // ARRANGE

      const input = screen.getByPlaceholderText('New Todo'); //ACT
      await userEvent.type(input, 'hey there');
      const button = screen.getByRole('button', {
        name: 'Submit',
      });
      await userEvent.click(button);

      expect(input).toHaveValue(''); // ASSERT
    });

    it('should call setTodos when submitted', async () => {
      render(<AddTodo setTodos={mockSetTodos} />); // ARRANGE

      const input = screen.getByPlaceholderText('New Todo'); //ACT
      await userEvent.type(input, 'hey there');
      const button = screen.getByRole('button', {
        name: 'Submit',
      });
      await userEvent.click(button);

      expect(mockSetTodos).toHaveBeenCalled(); // ASSERT
    });
  });
});
