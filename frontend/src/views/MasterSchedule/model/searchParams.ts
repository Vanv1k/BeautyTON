import { z } from 'zod';

export const masterScheduleSearchSchema = z.object({
  date: z.string().optional(),
  timeSlot: z.string().optional(),
});
