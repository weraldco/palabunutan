'use server';

import { userSchema } from '@/schemas/user';
import { DealFormState } from '@/types/deal';
import { convertZodErrors } from '@/utils/errors';

export const formHandlerAction = async (
	formData: FormData
): Promise<DealFormState<undefined>> => {
	const unvalidateData = {
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	};

	const validated = userSchema.safeParse(unvalidateData);

	if (!validated.success) {
		const errors = convertZodErrors(validated.error);
		return { errors };
	} else {
		return { successMsg: 'Deal added successfully.' };
	}
};
