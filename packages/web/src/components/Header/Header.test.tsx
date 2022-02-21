import { render, screen } from "@testing-library/react";
import Header from ".";

test("renders hello header", () => {
  render(<Header />);
  const headerElement = screen.getByText(/hello/i);
  expect(headerElement).toBeInTheDocument();
});
