/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signFormSchema } from './lib/auth-schema';
import prisma from './lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				secretName: {
					label: 'secreteName',
					type: 'text',
					placeholder: 'secret name',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			authorize: async (credentials) => {
				const secretName = credentials.secretName as string;
				const password = credentials.password as string;

				const parsedCredentials = signFormSchema.safeParse(credentials);

				if (!parsedCredentials.success) {
					console.error('Invalid credentials', parsedCredentials.error.errors);
					return null;
				}

				const user = await prisma.user.findUnique({ where: { secretName } });
				if (!user) {
					console.log('User not exist!');
					return null;
				}

				const isMatch = bcrypt.compare(password, user.hashedPassword as string);

				if (!isMatch) {
					console.log('Incorrect password!');
					return null;
				}

				return user;
			},
		}),
	],
	callbacks: {
		// authorized({ request: { nextUrl }, auth }) {
		// 	const isLoggedIn = !!auth?.user;
		// 	const { pathname } = nextUrl;

		// 	if (pathname.startsWith('/sign-in') && isLoggedIn) {
		// 		return Response.redirect(new URL('/', nextUrl));
		// 	}

		// 	if (pathname.startsWith('/sign-up') && isLoggedIn) {
		// 		return Response.redirect(new URL('/', nextUrl));
		// 	}
		// 	return !!auth;
		// },

		jwt({ token, user }) {
			if (user) {
				token.id = user.id as string;
			}
			return token;
		},
		session({ session, token }) {
			session.user.id = token.id;
			return session;
		},
	},
	pages: {
		signIn: '/sign-in',
	},
});
