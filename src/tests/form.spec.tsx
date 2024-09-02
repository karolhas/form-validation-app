import { render, screen } from "@testing-library/react";
import { Form } from "@/components/ui/form";
import { userEvent } from "@testing-library/user-event";

describe("form", () => {
  test("renders form", () => {
    render(<Form />);
    expect(screen.getByRole("heading", { name: "Example Form" })).toBeDefined();
  });

  test("handles duration input", async () => {
    render(<Form />);
    const durationInput = screen.getByTestId("duration");
    await userEvent.clear(durationInput);
    await userEvent.type(durationInput, "30");

    expect(durationInput).toHaveValue(30);
  });
});
