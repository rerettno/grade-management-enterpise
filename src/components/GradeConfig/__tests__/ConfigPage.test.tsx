import { render, screen, fireEvent } from "@testing-library/react";
import ConfigPage from "../ConfigPage";
import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import "@testing-library/jest-dom";

jest.mock("@/stores/gradeConfigStore");

beforeEach(() => {
  (useGradeConfigStore as unknown as jest.Mock).mockImplementation((selector) =>
    selector({
      items: [
        { id: "1", name: "Tugas", percentage: 20 },
        { id: "2", name: "UTS", percentage: 25 },
      ],
      setItems: jest.fn(),
      updatePercentage: jest.fn(),
      saveVersion: jest.fn(),
      rollback: jest.fn(),
      history: [],
      saveTemplate: jest.fn(),
      loadTemplate: jest.fn(),
      templates: {},
    })
  );
});

test("renders config page with items", () => {
  render(<ConfigPage />);
  expect(screen.getByText("Tugas")).toBeInTheDocument();
  expect(screen.getByText(/Total persentase/)).toBeInTheDocument();
});
