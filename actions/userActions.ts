/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type UserTypes = {
	fullname: string;
	secretName: string;
	password: string;
	repeatPassword: string;
	firstWishlist: string;
	secondWishlist?: string | undefined;
	thirdWishlist?: string | undefined;
};

export const getUserBySecretName = async (secretName: string) => {
	const user = await prisma.user.findUnique({ where: { secretName } });
	try {
		if (!user) {
			return null;
		}
		return user;
	} catch (error) {
		console.error(error);
	}
};

export const checkLoginDetails = async (
	secretName: string,
	password: string
) => {
	try {
		const user = await prisma.user.findUnique({ where: { secretName } });
		if (!user) {
			return 'User not existing';
		} else {
			const isMatch = await bcrypt.compare(
				password,
				user.hashedPassword as string
			);

			if (isMatch) {
				return null;
			} else {
				return 'Incorrect password!';
			}
		}
	} catch (error) {
		console.error(error);
	}
};

export const registerUser = async (values: UserTypes) => {
	// console.log(values);

	const {
		fullname,
		secretName,
		password,
		repeatPassword,
		firstWishlist,
		secondWishlist,
		thirdWishlist,
	} = values;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await prisma.user.create({
			data: {
				fullname,
				secretName,
				hashedPassword,
				firstWishlist,
				secondWishlist,
				thirdWishlist,
			},
		});
	} catch (error) {
		console.log(error);
	} finally {
		revalidatePath('/sign-up');
		redirect('/');
	}
};
