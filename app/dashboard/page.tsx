// import { getPickedResult } from '@/action/auth';
import { auth } from '@/auth';
import Navbar from '@/components/Navbar';
// import PickButton from '@/components/PickButton';
import { redirect } from 'next/navigation';
import React from 'react';

import PickButton from '@/components/PickButton';
import { Pixelify_Sans } from 'next/font/google';
const noto = Pixelify_Sans({ weight: '400', subsets: ['latin'] });

export default async function DashboardPage() {
	const session = await auth();
	if (!session?.user) {
		redirect('/');
	}
	// Lipat natin to sa api call
	// const result = await getPickedResult(session.user.secretName as string);
	return (
		<div>
			<Navbar />

			<div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
				<div className="flex flex-col justify-center items-center gap-4">
					<span className={`text-4xl md:text-5xl ${noto.className}`}>
						Welcome aboard,
						<br /> <span className="text-pink-500">{session.user.name}</span>
					</span>
				</div>
				<div className="flex justify-center items-center">
					{session.user.youPicked == null ? (
						<div className="flex flex-col gap-10">
							<div className={`w-[350px] md:w-[500px] italic`}>
								Thank you for joining this event! The button below will be used
								to draw your Monito/Monita for the Christmas Party. It is
								currently disabled, and it will be active once all guests have
								registered. We will announce when the button is ready to use.
							</div>
							<PickButton />
						</div>
					) : (
						<div className="text-sm md:text-base italic w-[300px] md:w-[400px] flex flex-col gap-2">
							<span>Your secret santa is</span>
							<div className="bg-teal-500 p-10 rounded-xl flex flex-col gap-10">
								<span className=" font-bold text-5xl text-pink-300 ">
									{session.user.youPicked.toUpperCase()}
								</span>
								<div className="flex flex-col text-left">
									<h1> {session.user.youPicked.toUpperCase()} WISHLIST:</h1>
									<span>{session.user.firstWishlist}</span>
									{session.user.secondWishlist ? (
										<span>{session.user.secondWishlist}</span>
									) : session.user.thirdWishlist ? (
										<span>{session.user.thirdWishlist}</span>
									) : null}
								</div>
							</div>
							<span>
								Thank you for participating in our Secret Santa gift exchange!
								See you in the event..
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
