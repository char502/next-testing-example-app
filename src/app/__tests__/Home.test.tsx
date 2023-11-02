import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';

// These are integration tests where testing different components together

describe('Home', () => {
  it('should add a new todo', async () => {
    render(<Home />); // ARRANGE

    // ACT
    const input = screen.getByPlaceholderText('New Todo');
    await userEvent.type(input, 'My new todo');
    expect(input).toHaveValue('My new todo'); // ASSERT

    // ACT
    const button = screen.getByRole('button', {
      name: 'Submit',
    });
    await userEvent.click(button);
    expect(input).toHaveValue(''); // ASSERT

    const data = await screen.findByText('My new todo');
    expect(data).toHaveTextContent('My new todo');
  });

  it('should update a todo', async () => {
    render(<Home />); // ARRANGE

    // ACT
    const checkbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked(); // ASSERT
  });

  it('should delete a todo', async () => {
    render(<Home />); // ARRANGE

    // used QUERY_BY_TEXT here because if search for it at some
    // point and it's not in the document, could have an error
    // good to use when need to check for something not to be in the document
    const todoText = screen.queryByText('Write Code 💻');
    expect(todoText).toBeInTheDocument(); // ASSERT

    // ACT
    // using test id is helpful here because there are different types of button on the page
    // so want to be getting the delete buttons no the select button
    const button = screen.getAllByTestId('delete-button')[0];
    await userEvent.click(button);

    expect(todoText).not.toBeInTheDocument(); // ASSERT
  });
});
