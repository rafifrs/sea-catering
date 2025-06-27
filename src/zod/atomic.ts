import { z } from 'zod';

export const PasswordSchema = z
  .string({
    invalid_type_error: 'Password harus berupa string',
    required_error: 'Password harus diisi',
  })
  .min(8, {
    message: 'Password minimal 8 karakter',
  });

export const EmailSchema = z
  .string({
    invalid_type_error: 'Email harus berupa string',
    required_error: 'Email harus diisi',
  })
  .email({
    message: 'Format email tidak valid',
  });