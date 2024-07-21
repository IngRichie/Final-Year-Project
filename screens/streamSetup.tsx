import React, { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-react-native';

const chatClient = StreamChat.getInstance('YOUR_STREAM_API_KEY');

useEffect(() => {
  const connectUser = async () => {
    await chatClient.connectUser(
      {
        id: 'user-id',
        name: 'User Name',
        // image: 'https://path/to/image.png',
      },
      chatClient.devToken('user-id')
    );
  };

  connectUser();

  return () => {
    chatClient.disconnectUser();
  };
}, []);

const channel = chatClient.channel('livestream', 'video-chat', {
  name: 'Video Chat Channel',
});

export default function App() {
  return (
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </Chat>
  );
}
