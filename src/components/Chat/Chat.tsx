import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Dayjs from 'dayjs';
import type {
  Channel,
  LiteralStringForUnion,
  StreamChat,
  UnknownType,
} from 'stream-chat';

import { useIsOnline } from './hooks/useIsOnline';
import { useStreami18n } from './hooks/useStreami18n';

import { ChatProvider } from '../../contexts/chatContext/ChatContext';
import {
  TranslationContextValue,
  TranslationProvider,
} from '../../contexts/translationContext/TranslationContext';
import { themed } from '../../styles/theme';
import type { Streami18n } from '../../utils/Streami18n';

import { version } from '../../../package.json';

type Props<
  At extends UnknownType = UnknownType,
  Ch extends UnknownType = UnknownType,
  Co extends string = LiteralStringForUnion,
  Ev extends UnknownType = UnknownType,
  Me extends UnknownType = UnknownType,
  Re extends UnknownType = UnknownType,
  Us extends UnknownType = UnknownType
> = {
  /** The StreamChat client object */
  client: StreamChat<At, Ch, Co, Ev, Me, Re, Us>;
  /**
   * Instance of Streami18n class should be provided to Chat component to enable internationalization.
   *
   * Stream provides following list of in-built translations:
   * 1. English (en)
   * 2. Dutch (nl)
   * 3. ...
   * 4. ...
   *
   * Simplest way to start using chat components in one of the in-built languages would be following:
   *
   * ```
   * const i18n = new Streami18n('nl');
   * <Chat client={chatClient} i18nInstance={i18n}>
   *  ...
   * </Chat>
   * ```
   *
   * If you would like to override certain keys in in-built translation.
   * UI will be automatically updated in this case.
   *
   * ```
   * const i18n = new Streami18n('nl');
   *
   * i18n.registerTranslation('nl', {
   *  'Nothing yet...': 'Nog Niet ...',
   *  '{{ firstUser }} and {{ secondUser }} are typing...': '{{ firstUser }} en {{ secondUser }} zijn aan het typen...',
   * });
   *
   * <Chat client={chatClient} i18nInstance={i18n}>
   *  ...
   * </Chat>
   * ```
   *
   * You can use the same function to add whole new language.
   *
   * ```
   * const i18n = new Streami18n('it');
   *
   * i18n.registerTranslation('it', {
   *  'Nothing yet...': 'Non ancora ...',
   *  '{{ firstUser }} and {{ secondUser }} are typing...': '{{ firstUser }} a {{ secondUser }} stanno scrivendo...',
   * });
   *
   * // Make sure to call setLanguage to reflect new language in UI.
   * i18n.setLanguage('it');
   * <Chat client={chatClient} i18nInstance={i18n}>
   *  ...
   * </Chat>
   * ```
   */
  i18nInstance?: typeof Streami18n;
  logger?: (message?: string) => void;
};

/**
 * Chat - Wrapper component for Chat. The needs to be placed around any other chat components.
 * This Chat component provides the ChatContext to all other components.
 *
 * The ChatContext provides the following props:
 *
 * - channel (the currently active channel)
 * - client (the client connection)
 * - connectionRecovering (whether or not websocket is reconnecting)
 * - isOnline (whether or not set user is active)
 * - logger (custom logging function)
 * - setActiveChannel (function to set the currently active channel)
 *
 * It also exposes the withChatContext HOC which you can use to consume the ChatContext
 *
 * @example ./Chat.md
 */
const Chat = <
  At extends UnknownType = UnknownType,
  Ch extends UnknownType = UnknownType,
  Co extends string = LiteralStringForUnion,
  Ev extends UnknownType = UnknownType,
  Me extends UnknownType = UnknownType,
  Re extends UnknownType = UnknownType,
  Us extends UnknownType = UnknownType
>(
  props: PropsWithChildren<Props<At, Ch, Co, Ev, Me, Re, Us>>,
) => {
  const { children, client, i18nInstance, logger = () => null } = props;

  const [channel, setChannel] = useState<Channel<At, Ch, Co, Ev, Me, Re, Us>>();
  const [translators, setTranslators] = useState<TranslationContextValue>({
    t: (key: string) => key,
    tDateTimeParser: (input?: string | number | Date) => Dayjs(input),
  });

  // Setup translators
  useStreami18n({ i18nInstance, setTranslators });

  // Setup connection event listeners
  const { connectionRecovering, isOnline } = useIsOnline<
    At,
    Ch,
    Co,
    Ev,
    Me,
    Re,
    Us
  >({
    client,
  });

  useEffect(() => {
    client.setUserAgent(`stream-chat-react-native-${Platform.OS}-${version}`);
  }, []);

  const setActiveChannel = (newChannel?: Channel<At, Ch, Co, Ev, Me, Re, Us>) =>
    setChannel(newChannel);

  if (!translators.t) return null;

  const chatContext = {
    channel,
    client,
    connectionRecovering,
    isOnline,
    logger,
    setActiveChannel,
  };

  return (
    <ChatProvider<At, Ch, Co, Ev, Me, Re, Us> value={chatContext}>
      <TranslationProvider value={translators}>{children}</TranslationProvider>
    </ChatProvider>
  );
};

Chat.themePath = '';

export default themed(Chat);