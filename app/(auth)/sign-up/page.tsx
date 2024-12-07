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

import { getUserBySecretName, registerUser } from '@/actions/userActions';
import AuthButton from '@/components/AuthButton';
import { formSchema } from '@/lib/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignUp() {
	// const { data: session } = useSession();
	// if (session) redirect('/dashboard');

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
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
		<Card className="w-full max-w-md mx-auto  bg-[#18191A] border-0 text-white">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create your account to get started.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base text-gray-400">
										Fullname
									</FormLabel>
									<FormControl>
										<Input
											className="rounded-full text-gray-800 text-base md:text-lg"
											placeholder="eg. Werald Opolento"
											{...field}
										/>
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
									<FormLabel className="text-base text-gray-400">
										Secret Name
									</FormLabel>
									<FormControl>
										<Input
											className="rounded-full text-gray-800 text-base md:text-lg"
											placeholder="eg. Zorro"
											{...field}
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
									<FormLabel className="text-base text-gray-400">
										Password
									</FormLabel>
									<FormControl>
										<Input
											className="rounded-full text-gray-800 text-base md:text-lg"
											type="password"
											placeholder="*******"
											{...field}
										/>
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
									<FormLabel className="text-base text-gray-400">
										Repeat password
									</FormLabel>
									<FormControl>
										<Input
											className="rounded-full text-gray-800 text-base md:text-lg"
											type="password"
											placeholder="*******"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormDescription className="text-base text-gray-400">
							Your wishlist
						</FormDescription>
						<FormField
							control={form.control}
							name="firstWishlist"
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel className='text-base text-gray-400'>Wishlist 1</FormLabel> */}
									<FormControl>
										<Input
											className="rounded-full text-gray-800 text-base md:text-lg"
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
									{/* <FormLabel className='text-base text-gray-400'>Wishlist 1</FormLabel> */}
									<FormControl>
										<Input
											className="rounded-full text-gray-800 text-base md:text-lg"
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
									{/* <FormLabel className='text-base text-gray-400'>Wishlist 1</FormLabel> */}
									<FormControl>
										<Input
											className="rounded-full text-gray-800 text-base md:text-lg"
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
					<Link href="/sign-in" className="text-white hover:underline">
						Sign-in
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
