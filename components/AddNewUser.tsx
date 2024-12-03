'use client';

import { formHandlerAction } from '@/actions/formHandler';
import { StringMap } from '@/types/deal';
import React, { useState } from 'react';

export default function AddNewUserForm() {
	const [errors, setErrors] = useState<StringMap>({});

	const handleFormSubmit = async (formData: FormData) => {
		const { errors, successMsg } = await formHandlerAction(formData);
		if (errors) {
			setErrors(errors);
		}
		console.log(errors, successMsg);
	};

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-xl font-bold">Add New Student</h2>
			<form
				action={handleFormSubmit}
				className="flex flex-col gap-4 w-[400px] text-gray-900"
			>
				<div className="flex flex-col gap-1">
					<label className="text-sm text-white" htmlFor="name">
						Name
					</label>
					<input
						type="text"
						className="px-4 py-2"
						name="name"
						id="name"
						placeholder="Enter your username.."
						required
					/>
					{errors?.name && (
						<small className="text-red-400">{errors.name}</small>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-sm text-white" htmlFor="email">
						Email
					</label>
					<input
						type="text"
						className="px-4 py-2"
						name="email"
						id="email"
						placeholder="Enter your email.."
						required
					/>
					{errors?.email && (
						<small className="text-red-400">{errors.email}</small>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-sm text-white" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						className="px-4 py-2"
						placeholder="Enter your password.."
						name="password"
						id="password"
						required
						minLength={6}
					/>
					{errors?.password && (
						<small className="text-red-400">{errors.password}</small>
					)}
				</div>
				{/* <div className="flex flex-col gap-1">
					<label className="text-xs" htmlFor="number">
						Number
					</label>
					<input
						type="number"
						className="px-4 py-2"
						placeholder="Enter random number.."
						name="number"
						id="number"
						required
						min={1}
						max={100}
						defaultValue={10}
					/>
				</div> */}
				<button
					type="submit"
					className="p-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 duration-200"
				>
					Create
				</button>
			</form>
		</div>
	);
}
