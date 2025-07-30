export async function updateStudentGradeAPI(
  nim: string,
  component: string,
  value: number
) {
  console.log(`[API] Updating ${component} for ${nim} to ${value}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.85) {
        resolve({ success: true });
      } else {
        reject(new Error("Simulated network error"));
      }
    }, 600);
  });
}
