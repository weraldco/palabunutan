'use client';
import { z } from 'zod';

export const formSchema = z.object({
	fullname: z
		.string()
		.min(2, { message: 'Name must be at least 2 character long.' })
		.max(50, { message: 'Name cannot exceed 50 characters.' }),
	secretName: z
		.string()
		.min(2, { message: 'Name must be at least 2 character long.' })
		.max(50, { message: 'Name cannot exceed 50 characters.' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 character long.' })
		.max(50, { message: 'Password cannot exceed to 50 characters.' }),
	repeatPassword: z
		.string()
		.min(8, { message: 'Password must be at least 8 character long.' })
		.max(50, { message: 'Password cannot exceed to 50 characters.' }),
	firstWishlist: z
		.string()
		.min(5, { message: 'Password must be at least 5 character long.' })
		.max(150, { message: 'Password cannot exceed to 150 characters.' }),
	secondWishlist: z.string().optional(),
	thirdWishlist: z.string().optional(),
});

export const signFormSchema = formSchema.pick({
	secretName: true,
	password: true,
});
