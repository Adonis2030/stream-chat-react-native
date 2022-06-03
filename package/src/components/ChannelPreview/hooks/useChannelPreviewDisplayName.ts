import { useEffect, useState } from 'react';

import type { Channel } from 'stream-chat';
import type { ChannelNew } from 'stream-chat-react-native';

import { useChatContext } from '../../../contexts/chatContext/ChatContext';

import type { DefaultStreamChatGenerics } from '../../../types/types';
import { vw } from '../../../utils/utils';

const maxCharacterLengthDefault = (vw(100) - 16) / 6;

export const getChannelPreviewDisplayName = ({
  channelName,
  currentUserId,
  maxCharacterLength,
  members,
}: {
  maxCharacterLength: number;
  channelName?: string;
  currentUserId?: string;
  members?: ChannelNew['members'];
}) => {
  if (channelName) return channelName;

  const channelMembers = Object.values(members || {});
  const otherMembers = channelMembers.filter((member) => member.user?.id !== currentUserId);

  const name = otherMembers.slice(0).reduce((returnString, currentMember, index, originalArray) => {
    const returnStringLength = returnString.length;
    const currentMemberName = currentMember.user?.name || currentMember.user?.id || 'Unknown User';
    // a rough approximation of when the +Number shows up
    if (returnStringLength + (currentMemberName.length + 2) < maxCharacterLength) {
      if (returnStringLength) {
        returnString += `, ${currentMemberName}`;
      } else {
        returnString = currentMemberName;
      }
    } else {
      const remainingMembers = originalArray.length - index;
      returnString += `, +${remainingMembers}`;
      originalArray.splice(1); // exit early
    }
    return returnString;
  }, '');

  return name;
};

export const useChannelPreviewDisplayName = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
>(
  channel?: ChannelNew,
  characterLength?: number,
) => {
  const { client } = useChatContext<StreamChatGenerics>();

  const currentUserId = client?.userID || ''; // TODO
  const members = channel?.members;
  const numOfMembers = Object.keys(members || {}).length;
  const channelName = channel?.name;
  const maxCharacterLength = characterLength || maxCharacterLengthDefault;

  const [displayName, setDisplayName] = useState(
    getChannelPreviewDisplayName({
      channelName,
      currentUserId,
      maxCharacterLength,
      members,
    }),
  );

  useEffect(() => {
    setDisplayName(
      getChannelPreviewDisplayName({
        channelName,
        currentUserId,
        maxCharacterLength,
        members,
      }),
    );
  }, [channelName, currentUserId, maxCharacterLength, numOfMembers]);

  return displayName;
};
