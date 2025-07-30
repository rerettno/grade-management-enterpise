import { render, screen, fireEvent } from "@testing-library/react";
import ConfigItem from "../ConfigItem";
import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import "@testing-library/jest-dom";

jest.mock("@/stores/gradeConfigStore");

beforeEach(() => {
  (useGradeConfigStore as unknown as jest.Mock).mockImplementation((selector) =>
    selector({ updatePercentage: jest.fn() })
  );
});

test("renders config item and handles slider change", () => {
  const item = { id: "1", name: "Tugas", percentage: 20 };
  render(<ConfigItem item={item} index={0} moveCard={jest.fn()} errors={[]} />);
  expect(screen.getByText("Tugas")).toBeInTheDocument();
  fireEvent.change(screen.getByRole("slider"), { target: { value: 50 } });
});
