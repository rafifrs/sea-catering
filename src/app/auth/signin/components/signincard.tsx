'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { SignInForm, useSignIn } from "../mutation";
import { SignInSchema } from "@/zod/auth";

function SignInCard() {
    const router = useRouter();
    const loginCallbackMutation = useSignIn({ router });

    const form = useForm<SignInForm>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
        email: '',
        password: '',
        },
    });

    function onSubmit(values: SignInForm) {
        loginCallbackMutation.mutate(values);
    }
    return (
      <div>
        <Card className="-mt-8 w-full max-w-sm border-none bg-transparent py-0 shadow-none">
            <CardContent className="flex flex-col gap-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Masukkan Email Anda"
                            {...field}
                            className="rounded-lg bg-white p-3 text-black focus-visible:ring-[#f89e4b] focus-visible:ring-offset-0"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                        <Input
                            type="password"
                            placeholder="Masukkan Password Anda"
                            {...field}
                            className="rounded-lg bg-white p-3 text-black focus-visible:ring-[#f89e4b] focus-visible:ring-offset-0"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full bg-[#d83f87] text-base font-semibold hover:bg-[#c0387a]"
                >
                    Sign In
                </Button>
                </form>
            </Form>

            <div className="text-center">
                <Link href="/" className="text-sm text-[#d83f87] hover:underline">
                Forgot Password?
                </Link>
            </div>
            </CardContent>
        </Card>
    </div>
    );
}
  
export default SignInCard;
