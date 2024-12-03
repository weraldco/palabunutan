import { z } from 'zod';

export const userSchema = z.object({
	name: z
		.string({ message: 'Name is required!' })
		.min(10, 'Name should be 10 characters or more.'),
	email: z
		.string({ message: 'This is not a valid email.' })
		.email('This is not a valid email'),
	password: z
		.string({ message: 'Password is required.' })
		.min(6, 'Password should be more than 6 characters.'),
});
