import { z } from "zod";
import { validationMessages } from "../main.schema";

// 1. User Schema
export const userModel = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
  name: z.string().min(1, { message: validationMessages.min("Nama", 1) }),
  email: z
    .string()
    .email({ message: validationMessages.email("Email") })
    .min(1, { message: validationMessages.min("Nama", 1) }),
  roles: z.array(
    z.string().min(1, { message: validationMessages.min("Hak Akses", 1) })
  ),
  isActive: z.boolean().optional(), // tambahkan ini kalau server kirim `isActive`
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable().optional(),
});

export const changePasswordForm = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, { message: validationMessages.min("Password Baru", 8) })
    .max(255, { message: validationMessages.max("Password Baru", 255) }),

  password_confirmation: z
    .string()
    .min(8, { message: validationMessages.min("Konfirmasi Password", 8) })
    .max(255, { message: validationMessages.max("Konfirmasi Password", 255) }),
});
export type FormRt = z.infer<typeof changePasswordForm>;

// 2. Infer Type
export type User = z.infer<typeof userModel>;
