import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';

export default function Navbar() {
	return (
		<div className="border-b px-4">
			<div className="flex items-center justify-between mx-auto max-w-4xl h-14 ">
				<Link href="/">Logo</Link>
				<div className="flex gap-4">
					<Link href="/sign-in" className={buttonVariants()}>
						Sign-in
					</Link>
					<Link href="/sign-up" className={buttonVariants()}>
						Sign-up
					</Link>
				</div>
			</div>
		</div>
	);
}
