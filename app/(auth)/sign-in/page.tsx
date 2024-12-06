/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Link from 'next/link';
import React, { useState } from 'react';

import {
	checkLoginDetails,
	handleCredentialsSignIn,
} from '@/actions/userActions';
import AuthButton from '@/components/AuthButton';
import { signFormSchema } from '@/lib/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignIn() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const session = useSession();
	if (session == null) redirect('/');

	const form = useForm<z.infer<typeof signFormSchema>>({
		resolver: zodResolver(signFormSchema),
		defaultValues: {
			secretName: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof signFormSchema>) {
		try {
			setLoading(true);
			const check = await checkLoginDetails(values.secretName, values.password);
			if (check !== null) {
				setLoading(false);
				setError(check as string);
				setLoading(false);
			} else {
				const result = await handleCredentialsSignIn(values);
				setLoading(false);
			}
		} catch (error) {
			console.log('An unexpected error occurred. Please try again.');
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>
					Welcome back! Please sign in to continue
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="secretName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base text-gray-900">
										Secret name
									</FormLabel>
									<FormControl>
										<Input placeholder="Enter your secret name.." {...field} />
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
									<FormLabel className="text-base text-gray-900">
										Password
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter your password.."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{error && (
							<FormDescription className="text-red-400">
								{error}
							</FormDescription>
						)}
						<AuthButton loading={loading}>Login</AuthButton>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-muted-foreground">
					Don&apos;t have an account yet?{' '}
					<Link href="/sign-up" className="text-primary hover:underline">
						Sign-up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
