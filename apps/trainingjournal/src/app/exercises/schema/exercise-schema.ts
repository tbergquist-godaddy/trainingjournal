import * as z from 'zod';

export const exerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});
