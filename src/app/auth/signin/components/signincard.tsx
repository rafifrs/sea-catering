'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 pb-4">
                    <h2 className="text-2xl font-bold text-center text-gray-900">Sign In to Your Account</h2>
                    <p className="text-center text-gray-600 text-sm">Welcome back to SEA Catering</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 pt-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Your Email"
                                                {...field}
                                                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400 focus:ring-2 focus:ring-opacity-20 transition-all duration-200 bg-white/70 rounded-lg p-3 text-black focus-visible:ring-orange-400 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter Your Password"
                                                {...field}
                                                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400 focus:ring-2 focus:ring-opacity-20 transition-all duration-200 bg-white/70 rounded-lg p-3 text-black focus-visible:ring-orange-400 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
                                disabled={loginCallbackMutation.isPending}
                            >
                                {loginCallbackMutation.isPending ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing In...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignInCard;