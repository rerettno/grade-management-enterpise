export interface ClassItem {
  id: string;
  name: string;
  instructor: string;
  semester: string;
  score: number;
}

const allClasses: ClassItem[] = Array.from({ length: 30 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Class ${i + 1}`,
  instructor: `Instructor ${i + 1}`,
  semester: `2025/${(i % 2) + 1}`,
  score: Math.floor(Math.random() * 50) + 50,
}));
export async function fetchClasses(page: number): Promise<ClassItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay
  const perPage = 6;
  const start = (page - 1) * perPage;
  return allClasses.slice(start, start + perPage);
}
