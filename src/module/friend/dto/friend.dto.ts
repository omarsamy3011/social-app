import { z } from 'zod';
import { FriendStatusEnum } from '../../../common/enums/friend.enum';

export const respondRequestSchema = z.object({
  action: z.enum([FriendStatusEnum.ACCEPTED, FriendStatusEnum.REJECTED], {
    required_error: 'Action is required',
    invalid_type_error: "Action must be either 'accepted' or 'rejected'",
  }),
});

export type RespondFriendRequestDto = z.infer<typeof respondRequestSchema>;