import { render, screen } from "@testing-library/react";
import PreviewBox from "../PreviewBox";
import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import "@testing-library/jest-dom";

jest.mock("@/stores/gradeConfigStore");

beforeEach(() => {
  (useGradeConfigStore as unknown as jest.Mock).mockImplementation((selector) =>
    selector({ items: [{ id: "1", name: "Tugas", percentage: 20 }] })
  );
});

test("renders preview box total", () => {
  render(<PreviewBox />);
  expect(screen.getByText(/⭐ TOTAL/)).toBeInTheDocument();
});
