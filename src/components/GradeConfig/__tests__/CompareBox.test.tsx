import { render, screen } from "@testing-library/react";
import CompareBox from "../CompareBox";
import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import "@testing-library/jest-dom";

jest.mock("@/stores/gradeConfigStore");

beforeEach(() => {
  (useGradeConfigStore as unknown as jest.Mock).mockImplementation((selector) =>
    selector({
      items: [{ id: "1", name: "Tugas", percentage: 20 }],
      templates: { test: [{ id: "1", name: "Tugas", percentage: 30 }] },
      setItems: jest.fn(),
      updatePercentage: jest.fn(),
      saveVersion: jest.fn(),
      rollback: jest.fn(),
      saveTemplate: jest.fn(),
      loadTemplate: jest.fn(),
      history: [],
    })
  );
});

test("renders compare box title", () => {
  render(<CompareBox />);
  expect(screen.getByText(/Compare Tool/i)).toBeInTheDocument();
});
