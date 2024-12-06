/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaAdapter } from '@auth/prisma-adapter';
// import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserBySecretName } from './actions/userActions';
import { signFormSchema } from './lib/auth-schema';
import prisma from './lib/prisma';

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [
		Credentials({
			credentials: {
				secretName: {},
				password: {},
			},
			async authorize(credentials) {
				let user = null;

				const { secretName, password } = await signFormSchema.parseAsync(
					credentials
				);

				// logic to salt and hash password
				// const pwHash = bcrypt.hash(password, 10);
				// console.log(password);

				// // logic to verify if the user exists
				user = await getUserBySecretName(secretName);
				// user = {
				// 	id: 1,
				// 	name: 'Werald Opolento',
				// 	email: 'werald@sample.com',
				// };

				if (!user) {
					console.log('Invalid credentials.');
					return null;
				}

				// return JSON object with the user data
				return user;
			},
		}),
	],
});
