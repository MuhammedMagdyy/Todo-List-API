import { z } from 'zod';

export const taskSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be at most 30 characters')
    .trim(),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(100, 'Description must be at most 100 characters')
    .trim()
    .optional(),
  dueDate: z.coerce.date().optional(),
  projectUuid: z.string().uuid({ message: 'project is required' }),
  tagUuid: z.string().uuid().optional(),
  statusUuid: z.string().uuid({ message: 'status is required' }),
});

export const taskUpdateSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be at most 30 characters')
      .trim(),
    description: z
      .string()
      .min(3, 'Description must be at least 3 characters')
      .max(100, 'Description must be at most 100 characters')
      .trim()
      .optional(),
    dueDate: z.coerce.date({ message: 'Due date is required' }),
    projectUuid: z.string().uuid({ message: 'Project is required' }),
    tagUuid: z.string().uuid({ message: 'Tag is required' }),
    statusUuid: z.string().uuid({ message: 'Status is required' }),
  })
  .partial();
