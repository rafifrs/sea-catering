'use client';
import { useMutation } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';
import { z } from 'zod';
import { SignUpSchema } from '@/zod/auth'; 

export type SignUpForm = z.infer<typeof SignUpSchema>;

export function useSignUp({ router }: { router: AppRouterInstance }) {
  return useMutation({
    mutationFn: async (data: SignUpForm) => {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mendaftar');
      }

      return response.json();
    },
    onMutate: () => {
      const loadingToast = toast.loading('Membuat akun...', { duration: Infinity });
      return { loadingToast };
    },
    onSuccess: (_data, _variables, context) => {
      toast.dismiss(context.loadingToast);
      toast.success('Akun berhasil dibuat!', {
        description: 'Anda akan diarahkan ke halaman login.',
      });
      router.push('/auth/signin'); 
    },
    onError: (error, _variables, context) => {
      toast.dismiss(context?.loadingToast);
      toast.error('Gagal mendaftar', {
        description: error.message,
      });
    },
  });
}