import * as z from 'zod';

export const userValidation = z.object({
	image: z.string().url().nonempty(),
	name: z.string().min(3).max(30),
	email: z.string().min(3).max(30),
});
