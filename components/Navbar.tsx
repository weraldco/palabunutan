import { handleSignOut } from '@/actions/userActions';
import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';
import { Button, buttonVariants } from './ui/button';

export default async function Navbar() {
	const session = await auth();
	console.log(session);
	return (
		<div className="border-b px-4">
			<div className="flex items-center justify-between mx-auto max-w-4xl h-14 ">
				<Link href="/">Logo</Link>
				{!session ? (
					<div className="flex gap-4">
						<Link href="/sign-in" className={buttonVariants()}>
							Sign-in
						</Link>
						<Link href="/sign-up" className={buttonVariants()}>
							Sign-up
						</Link>
					</div>
				) : (
					<form action={handleSignOut}>
						<Button type="submit" className={buttonVariants()}>
							Sign-out
						</Button>
					</form>
				)}
			</div>
		</div>
	);
}
