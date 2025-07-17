import z from "zod/v3";

export const validationMessages = {
  required: (field: string) => `${field} wajib diisi.`,
  email: (field: string) => `${field} harus berupa alamat email yang valid.`,
  min: (field: string, min: number) => `${field} minimal ${min} karakter.`,
  max: (field: string, max: number) => `${field} maksimal ${max} karakter.`,

  min_number: (field: string, min: number) =>
    `${field} harus setidaknya ${min}.`,
  max_number: (field: string, max: number) =>
    `${field} tidak boleh lebih besar dari ${max}.`,
  numeric: (field: string) => `${field} harus berupa angka.`,

  min_select: (field: string) => `Silahkan pilih salah satu data ${field}.`,

  boolean: (field: string) => `${field} harus berupa Ya atau Tidak.`,
};

export const nomorHp = z
  .string()
  .optional()
  .refine(
    (val) => !val || val === "" || /^(\+62|62|08|8)[1-9][0-9]{7,11}$/.test(val),
    {
      message: "Nomor HP tidak valid",
    }
  );

export const fileInfo = z.object({
  filename: z.string().nullable(),
  disk: z.string().nullable(),
  folder: z.string().nullable(),
  path: z.string().nullable(),
});

export type FileKey = {
  disk: string;
  folder: string;
  filename: string;
  path: string;
};
