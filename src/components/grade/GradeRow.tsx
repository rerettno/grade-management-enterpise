import { StudentGrade, GradeComponent } from "@/types/grade";
import GradeCell from "./GradeCell";

type Props = {
  student: StudentGrade;
};

export default function GradeRow({ student }: Props) {
  return (
    <tr className="border-b text-sm text-gray-700">
      <td className="px-4 py-2">{student.nim}</td>
      <td className="px-4 py-2">{student.name}</td>
      {(Object.keys(student.grades) as GradeComponent[]).map((key) => (
        <GradeCell
          key={key}
          value={student.grades[key]}
          component={key}
          nim={student.nim}
        />
      ))}
    </tr>
  );
}
