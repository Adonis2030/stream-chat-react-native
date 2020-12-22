import { useMemo } from 'react';

import type { ThreadContextValue } from '../../../contexts/threadContext/ThreadContext';
import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../../types/types';

export const useCreateThreadContext = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>({
  allowThreadMessagesInChannel,
  closeThread,
  loadMoreThread,
  openThread,
  thread,
  threadHasMore,
  threadLoadingMore,
  threadMessages,
}: ThreadContextValue<At, Ch, Co, Ev, Me, Re, Us>) => {
  const threadId = thread?.id;
  const threadMessagesUpdated = threadMessages
    .map(
      ({ latest_reactions, reply_count, status, updated_at }) =>
        `${latest_reactions?.length}${reply_count}${status}${
          updated_at
            ? typeof updated_at === 'string'
              ? updated_at
              : updated_at.toISOString()
            : ''
        }`,
    )
    .join();

  const threadContext: ThreadContextValue<At, Ch, Co, Ev, Me, Re, Us> = useMemo(
    () => ({
      allowThreadMessagesInChannel,
      closeThread,
      loadMoreThread,
      openThread,
      thread,
      threadHasMore,
      threadLoadingMore,
      threadMessages,
    }),
    [
      allowThreadMessagesInChannel,
      threadHasMore,
      threadId,
      threadLoadingMore,
      threadMessagesUpdated,
    ],
  );

  return threadContext;
};
