import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(30, 'Name must be at most 30 characters').trim(),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(100, 'Description must be at most 100 characters')
    .trim()
    .optional(),
  statusUuid: z.string().uuid(),
  color: z.string().min(3, 'Color must be at least 3 characters').max(20, 'Color must be at most 20 characters').trim(),
  dueDate: z.coerce.date(),
});
