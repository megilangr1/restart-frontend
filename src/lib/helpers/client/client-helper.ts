import { doAlert } from "../alert";

type FieldError = { field: string; message: string };

export function handleFormError<T extends Record<string, unknown>>(
  code: string,
  result: unknown,
  message: string,
  form?: { setError: (field: keyof T, error: { message: string }) => void },
  customAction?: () => void
): void {
  if (code === "V400" && typeof result === "object" && form) {
    const validationErrors = extractValidationError(result);
    validationErrors.forEach((error) => {
      form.setError(error.field as keyof T, {
        message: error.message,
      });
    });
  } else {
    doAlert(
      0,
      "Terjadi Kesalahan, Silahkan Hubungi Administrator ! | " + message
    );
  }

  customAction?.();
}

export function extractValidationError(result: unknown): FieldError[] {
  if (!Array.isArray(result)) return [];

  const seen = new Set<string>();
  const errors: FieldError[] = [];

  for (const item of result) {
    if (
      item &&
      typeof item === "object" &&
      "field" in item &&
      "message" in item &&
      typeof item.field === "string" &&
      typeof item.message === "string"
    ) {
      if (!seen.has(item.field)) {
        // Simpan hanya error pertama untuk 1 field (jika duplikat)
        seen.add(item.field);
        errors.push({
          field: item.field,
          message: item.message,
        });
      }
    }
  }

  return errors;
}

// export const extractValidationError = (
//   object: Record<string, string[]> | unknown
// ) => {
//   console.log(object, isRecordStringArray(object));
//   if (isRecordStringArray(object)) {
//     return Object.entries(object).map(([field, message]) => {
//       return {
//         field,
//         message: message[0],
//       };
//     });
//   }
//   // Menangani jika `object` bukan tipe Record<string, string[]>
//   return [];
// };

// function isRecordStringArray(
//   object: unknown
// ): object is Record<string, string[]> {
//   return (
//     object !== null &&
//     typeof object === "object" &&
//     Object.values(object).every(
//       (value) =>
//         Array.isArray(value) && value.every((item) => typeof item === "string")
//     )
//   );
// }
