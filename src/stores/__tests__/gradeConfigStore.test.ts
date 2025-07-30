import { useGradeConfigStore } from "../gradeConfigStore";

test("can update percentage", () => {
  useGradeConfigStore.setState({
    items: [{ id: "1", name: "Tugas", percentage: 20 }],
  });
  useGradeConfigStore.getState().updatePercentage("1", 50);
  const updated = useGradeConfigStore
    .getState()
    .items.find((i) => i.id === "1");
  expect(updated?.percentage).toBe(50);
});
