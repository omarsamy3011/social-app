import { z } from 'zod';

export const getUserFriendsSchema = {
  params: z.object({
    userId: z.string().min(1, 'User ID is required'),
  }),
};