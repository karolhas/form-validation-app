import { render, screen } from "@testing-library/react";
import { Form } from "@/components/Form";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

//Test generated by ChatGPT :)

describe("form", () => {
  test("renders form", async () => {
    const { container } = render(<Form />);

    expect(
      screen.getByRole("heading", { name: "Example Form" })
    ).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("handles duration input", async () => {
    render(<Form />);

    const durationInput = screen.getByTestId("duration");

    await userEvent.clear(durationInput);
    await userEvent.type(durationInput, "30");

    expect(durationInput).toHaveValue(30);
  });
});
