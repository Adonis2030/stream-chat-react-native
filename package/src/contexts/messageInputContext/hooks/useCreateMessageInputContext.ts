import { useMemo } from 'react';

import type { DefaultStreamChatGenerics } from '../../../types/types';
import type { ThreadContextValue } from '../../threadContext/ThreadContext';
import type { MessageInputContextValue } from '../MessageInputContext';

export const useCreateMessageInputContext = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
>({
  additionalTextInputProps,
  appendText,
  asyncIds,
  asyncUploads,
  AttachButton,
  autoCompleteSuggestionsLimit,
  clearEditingState,
  clearQuotedMessageState,
  closeAttachmentPicker,
  CommandsButton,
  compressImageQuality,
  cooldownEndsAt,
  CooldownTimer,
  doDocUploadRequest,
  doImageUploadRequest,
  editing,
  editMessage,
  FileUploadPreview,
  fileUploads,
  giphyActive,
  hasCommands,
  hasFilePicker,
  hasImagePicker,
  ImageUploadPreview,
  imageUploads,
  initialValue,
  Input,
  inputBoxRef,
  InputButtons,
  InputEditingStateHeader,
  InputGiphySearch,
  InputReplyStateHeader,
  isValidMessage,
  maxMessageLength,
  maxNumberOfFiles,
  mentionAllAppUsersEnabled,
  mentionAllAppUsersQuery,
  mentionedUsers,
  MicButton,
  MicInput,
  MoreOptionsButton,
  numberOfLines,
  numberOfUploads,
  onChange,
  onChangeText,
  onSelectItem,
  openAttachmentPicker,
  openCommandsPicker,
  openFilePicker,
  openMentionsPicker,
  openVoiceUI,
  pickFile,
  quotedMessage,
  removeFile,
  removeImage,
  resetInput,
  selectedPicker,
  SendButton,
  sendImageAsync,
  sending,
  sendMessage,
  sendMessageAsync,
  SendMessageDisallowedIndicator,
  sendThreadMessageInChannel,
  setAsyncIds,
  setAsyncUploads,
  setFileUploads,
  setGiphyActive,
  setImageUploads,
  setInputBoxRef,
  setInputRef,
  setMentionedUsers,
  setNumberOfUploads,
  setQuotedMessageState,
  setSendThreadMessageInChannel,
  setShowMoreOptions,
  setShowVoiceUI,
  setText,
  showMoreOptions,
  ShowThreadMessageInChannelButton,
  showVoiceUI,
  text,
  thread,
  toggleAttachmentPicker,
  triggerSettings,
  updateMessage,
  uploadFile,
  uploadImage,
  uploadNewFile,
  uploadNewImage,
  UploadProgressIndicator,
}: MessageInputContextValue<StreamChatGenerics> &
  Pick<ThreadContextValue<StreamChatGenerics>, 'thread'>) => {
  const editingExists = !!editing;
  const fileUploadsValue = fileUploads
    .map(({ duration, paused, progress, state }) => `${state},${paused},${progress},${duration}`)
    .join();
  const imageUploadsValue = imageUploads.map(({ state }) => state).join();
  const mentionedUsersLength = mentionedUsers.length;
  const quotedMessageId = quotedMessage
    ? typeof quotedMessage === 'boolean'
      ? ''
      : quotedMessage.id
    : '';
  const threadId = thread?.id;

  const messageInputContext: MessageInputContextValue<StreamChatGenerics> = useMemo(
    () => ({
      additionalTextInputProps,
      appendText,
      asyncIds,
      asyncUploads,
      AttachButton,
      autoCompleteSuggestionsLimit,
      clearEditingState,
      clearQuotedMessageState,
      closeAttachmentPicker,
      CommandsButton,
      compressImageQuality,
      cooldownEndsAt,
      CooldownTimer,
      doDocUploadRequest,
      doImageUploadRequest,
      editing,
      editMessage,
      FileUploadPreview,
      fileUploads,
      giphyActive,
      hasCommands,
      hasFilePicker,
      hasImagePicker,
      ImageUploadPreview,
      imageUploads,
      initialValue,
      Input,
      inputBoxRef,
      InputButtons,
      InputEditingStateHeader,
      InputGiphySearch,
      InputReplyStateHeader,
      isValidMessage,
      maxMessageLength,
      maxNumberOfFiles,
      mentionAllAppUsersEnabled,
      mentionAllAppUsersQuery,
      mentionedUsers,
      MicButton,
      MicInput,
      MoreOptionsButton,
      numberOfLines,
      numberOfUploads,
      onChange,
      onChangeText,
      onSelectItem,
      openAttachmentPicker,
      openCommandsPicker,
      openFilePicker,
      openMentionsPicker,
      openVoiceUI,
      pickFile,
      quotedMessage,
      removeFile,
      removeImage,
      resetInput,
      selectedPicker,
      SendButton,
      sendImageAsync,
      sending,
      sendMessage,
      sendMessageAsync,
      SendMessageDisallowedIndicator,
      sendThreadMessageInChannel,
      setAsyncIds,
      setAsyncUploads,
      setFileUploads,
      setGiphyActive,
      setImageUploads,
      setInputBoxRef,
      setInputRef,
      setMentionedUsers,
      setNumberOfUploads,
      setQuotedMessageState,
      setSendThreadMessageInChannel,
      setShowMoreOptions,
      setShowVoiceUI,
      setText,
      showMoreOptions,
      ShowThreadMessageInChannelButton,
      showVoiceUI,
      text,
      toggleAttachmentPicker,
      triggerSettings,
      updateMessage,
      uploadFile,
      uploadImage,
      uploadNewFile,
      uploadNewImage,
      UploadProgressIndicator,
    }),
    [
      cooldownEndsAt,
      editingExists,
      fileUploadsValue,
      giphyActive,
      imageUploadsValue,
      maxMessageLength,
      mentionedUsersLength,
      quotedMessageId,
      selectedPicker,
      sendThreadMessageInChannel,
      showMoreOptions,
      showVoiceUI,
      text,
      threadId,
    ],
  );

  return messageInputContext;
};
