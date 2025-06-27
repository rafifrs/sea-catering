import { z } from 'zod';

import { EmailSchema, PasswordSchema } from './atomic';

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const ForgotPasswordSchema = z.object({
  email: EmailSchema,
});

export const SignUpSchema = z.object({
  name: z.string().min(3, { message: 'Nama minimal 3 karakter' }),
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
});