import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event"
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("should clear the input field after adding the task", async() => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', {name: 'Add Task:'});
    const button = screen.getByRole('button', {name: 'Add'});

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
        expect(input).toHaveValue('');
    });
  });

  test("should not add an empty task", async() => {
    const user = userEvent.setup();
    render(<App/>);
    
    const input = screen.getByRole('textbox', {name: 'Add Task:'});
    const button = screen.getByRole('button', {name: 'Add'});

    await user.type(input, ' ');
    await user.click(button);

    await waitFor(() => {
        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });
  test("should add a task by pressing the enter key", async() => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', {name: 'Add Task:'});
    await user.type(input, 'New Task{enter}');
    await waitFor(() => {
        expect(screen.queryAllByRole('listitem')).toHaveLength(1);
    });
  });

  test("should delete the task after clicking the delete button", async() => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByRole('textbox', {name: 'Add Task:'});
    const addButton = screen.getByRole('button', {name: 'Add'});

    await user.type(input, 'New Task');
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    })
    const deleteButton = screen.getByRole('button', {name: /Delete/i});

    await user.click(deleteButton);
    await waitFor(() => {
      expect(screen.queryByText('New Task')).not.toBeInTheDocument();
    })

  });
  
  test("should edit the task after clicking the edit button", async() => {
    const user = userEvent.setup();
    render(<App/>);
    const input = screen.getByRole('textbox', {name: 'Add Task:'});
    const addButton = screen.getByRole('button', {name: 'Add'});

    await user.type(input, 'New Task');
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    const editButton = screen.getByRole('button', {name: 'Edit'});
    await user.click(editButton);

    const editInput = screen.getByRole('textbox', {name: 'Edit Task:'});
    expect(editInput).toHaveValue('New Task');

    await user.clear(editInput);
    await user.type(editInput, 'Updated Task');

    const saveButton = screen.getByRole('button', {name: "Save"});
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByText('New Task')).not.toBeInTheDocument();
      expect(screen.getByText('Updated Task')).toBeInTheDocument();
    });

  });
});
