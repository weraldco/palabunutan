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

import { Button } from '@/components/ui/button';
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

import { getUserBySecretName, registerUser } from '@/actions/userActions';
import AuthButton from '@/components/AuthButton';
import { formSchema } from '@/lib/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignUp() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullname: '',
			secretName: '',
			password: '',
			repeatPassword: '',
			firstWishlist: '',
			secondWishlist: '',
			thirdWishlist: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		if (!(await getUserBySecretName(values.secretName))) {
			if (values.password === values.repeatPassword) {
				registerUser(values);
				setLoading(false);
			} else {
				setLoading(false);
				setError("Password didn't match!");
			}
		} else {
			setLoading(false);
			setError('Secret name is already in registered!');
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create your account to get started.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="fullname"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Fullname</FormLabel>
									<FormControl>
										<Input placeholder="Werald Opolento" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="secretName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Secret Name</FormLabel>
									<FormControl>
										<Input placeholder="eg. Zorro" {...field} />
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="*******" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="repeatPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Repeat password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="*******" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormLabel>Your wishlist</FormLabel>
						<FormField
							control={form.control}
							name="firstWishlist"
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel>Wishlist 1</FormLabel> */}
									<FormControl>
										<Input
											type="text"
											placeholder="Enter your first option wishlist.."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="secondWishlist"
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel>Wishlist 1</FormLabel> */}
									<FormControl>
										<Input
											type="text"
											placeholder="Enter your second option wishlist.."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="thirdWishlist"
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel>Wishlist 1</FormLabel> */}
									<FormControl>
										<Input
											type="text"
											placeholder="Enter your third option wishlist.."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{error && (
							<FormDescription className="text-red-500 text-sm">
								{error}
							</FormDescription>
						)}

						<AuthButton loading={loading}>Submit</AuthButton>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-muted-foreground">
					Already have an account?{' '}
					<Link href="/sign-in" className="text-primary hover:underline">
						Sign-in
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
