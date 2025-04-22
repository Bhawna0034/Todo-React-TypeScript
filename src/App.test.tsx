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
});
