import React from 'react';
import { View } from 'react-native';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react-native';

import { Message } from '../../Message';

import { Chat } from '../../../Chat/Chat';
import { Channel } from '../../../Channel/Channel';
import { MessageInput } from '../../../MessageInput/MessageInput';
import { MessageList } from '../../../MessageList/MessageList';

import { getOrCreateChannelApi } from '../../../../mock-builders/api/getOrCreateChannel';
import { useMockedApis } from '../../../../mock-builders/api/useMockedApis';
import { generateChannel } from '../../../../mock-builders/generator/channel';
import { generateMember } from '../../../../mock-builders/generator/member';
import { generateMessage } from '../../../../mock-builders/generator/message';
import { generateUser } from '../../../../mock-builders/generator/user';
import { getTestClientWithUser } from '../../../../mock-builders/mock';
import { OverlayProvider } from '../../../../contexts/overlayContext/OverlayProvider';
import { ImageGalleryProvider } from '../../../../contexts/imageGalleryContext/ImageGalleryContext';

function MockedFlatList(props) {
  if (!props.data.length && props.ListEmptyComponent) return props.ListEmptyComponent();

  const items = props.data.map((item, index) => {
    const key = props.keyExtractor(item, index);
    return <View key={key}>{props.renderItem({ index, item })}</View>;
  });
  return <View testID={props.testID}>{items}</View>;
}

describe('Message', () => {
  let channel;
  let chatClient;
  let renderMessage;

  const user = generateUser({ id: 'id', name: 'name' });
  const messages = [generateMessage({ user })];

  beforeEach(async () => {
    const members = [generateMember({ user })];
    const mockedChannel = generateChannel({
      members,
      messages,
    });

    chatClient = await getTestClientWithUser(user);
    useMockedApis(chatClient, [getOrCreateChannelApi(mockedChannel)]);
    channel = chatClient.channel('messaging', mockedChannel.id);

    renderMessage = (options) =>
      render(
        <Chat client={chatClient}>
          <OverlayProvider>
            <Channel channel={channel}>
              <Message groupStyles={['bottom']} {...options} />
              <MessageInput />
            </Channel>
          </OverlayProvider>
        </Chat>,
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders the Message and MessageSimple components', async () => {
    const message = generateMessage({ user });

    const { getByTestId } = renderMessage({ message });

    await waitFor(() => {
      expect(getByTestId('message-wrapper')).toBeTruthy();
      expect(getByTestId('message-simple-wrapper')).toBeTruthy();
    });
  });

  it('calls the `onLongPressMessage` prop function if it exists', async () => {
    const message = generateMessage({ user });
    const onLongPressMessage = jest.fn();

    const { getByTestId } = renderMessage({
      animatedLongPress: false,
      message,
      onLongPressMessage,
    });

    await waitFor(() => {
      expect(getByTestId('message-wrapper')).toBeTruthy();
      expect(onLongPressMessage).toHaveBeenCalledTimes(0);
    });

    fireEvent(getByTestId('message-content-wrapper'), 'longPress');

    await waitFor(() => {
      expect(onLongPressMessage).toHaveBeenCalledTimes(1);
    });
  });
});
