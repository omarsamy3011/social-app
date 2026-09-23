import { z } from 'zod';
import { FriendStatusEnum } from '../../../common/enums/friend.enum';

export const respondRequestSchema = z.object({
  action: z.enum([FriendStatusEnum.ACCEPTED, FriendStatusEnum.REJECTED] as const, {
    message: "Action must be either 'accepted' or 'rejected'",
  }),
});

export type RespondFriendRequestDTO = z.infer<typeof respondRequestSchema>;