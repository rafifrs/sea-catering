'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Star } from 'lucide-react';
import { toast } from 'sonner'; 
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';


const formSchema = z.object({
    customerName: z.string().min(3, { message: 'Nama lengkap minimal 3 karakter.' }),
    reviewMessage: z.string().min(10, { message: 'Review minimal 10 karakter.' }),
    rating: z.number().min(1, { message: 'Rating harus diisi.' }).max(5),
});

export function TestimonialForm() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerName: session?.user?.name || '',
            reviewMessage: '',
            rating: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const response = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Gagal mengirim testimoni. Silakan coba lagi.');
            }
            
            toast.success('Review Anda telah berhasil dikirim.'); 
            form.reset();
            
        } catch (error: any) {
            toast.error(error.message); 
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl w-full">
            <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Bagikan Pendapat Anda</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Anda</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama Lengkap" {...field} disabled={!!session?.user} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="reviewMessage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review Anda</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ceritakan pengalaman Anda..." className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <Controller
                                name="rating"
                                control={form.control}
                                render={({ field }) => (
                                        <FormItem>
                                                <FormLabel>Rating</FormLabel>
                                                <div className="flex items-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star
                                                                        key={star}
                                                                        className={`w-8 h-8 cursor-pointer transition-colors ${
                                                                                star <= field.value ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                                                                        }`}
                                                                        onClick={() => field.onChange(star)}
                                                                />
                                                        ))}
                                                </div>
                                                <FormMessage />
                                        </FormItem>
                                )}
                        />

                        <Button type="submit" className="w-full bg-orange-400 hover:bg-orange-500" disabled={isLoading}>
                            {isLoading ? 'Mengirim...' : 'Kirim Review'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
