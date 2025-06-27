'use client';
import { signIn } from 'next-auth/react';
import { SignInSchema } from '@/zod/auth';
import { useMutation } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';
import { z } from 'zod';

export type SignInForm = z.infer<typeof SignInSchema>;

export function useSignIn({ router }: { router: AppRouterInstance }) {
  return useMutation({
    mutationFn: async (data: SignInForm) => {
      
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });


      
      if (result?.error) {
        switch (result.error) {
          case 'CredentialsSignin':
            throw new Error('Email atau password salah');
          case 'Configuration':
            throw new Error('Konfigurasi authentication bermasalah');
          case 'AccessDenied':
            throw new Error('Akses ditolak');
          case 'Verification':
            throw new Error('Verifikasi gagal');
          default:
            throw new Error('Login gagal: ' + result.error);
        }
      }

      
      if (!result?.url && !result?.ok) {
        throw new Error('Response tidak valid dari server');
      }

      return result;
    },

    onMutate: () => {
      const loadingToast = toast.loading('Sedang masuk...', { duration: Infinity });
      return { loadingToast };
    },

    onSuccess: (_data, _variables, context) => {
      toast.dismiss(context.loadingToast);
      toast.success('Berhasil masuk', {
        description: 'Selamat datang kembali',
      });
      router.push('/');
    },

    onError: (error, _variables, context) => {
      toast.dismiss(context?.loadingToast);
      
      
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat masuk';
      
      toast.error('Gagal masuk', {
        description: errorMessage,
      });
    },
  });
}