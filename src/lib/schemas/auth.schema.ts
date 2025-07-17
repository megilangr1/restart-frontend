import z from "zod/v3";
import { validationMessages } from "./main.schema";

export const AuthSchema = z.object({
  email: z
    .string()
    .email({ message: validationMessages.email("Email") })
    .min(1, { message: validationMessages.min("Email", 1) })
    .max(255, { message: validationMessages.max("Email", 255) }),
  password: z
    .string()
    .min(8, { message: validationMessages.min("Password", 8) }),
});
export type AuthForm = z.infer<typeof AuthSchema>;
