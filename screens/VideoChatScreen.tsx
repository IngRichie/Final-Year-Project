import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Button, StyleSheet } from 'react-native';

const VideoCallScreen = () => {
  const [videoCallLink, setVideoCallLink] = useState(null);

  const startVideoCall = () => {
    // You can dynamically create room links here and pass them to the WebView
    const roomID = Math.floor(Math.random() * 10000).toString();
    const videoCallLink = `https://yourwebapp.com/?roomID=${roomID}`; // Replace with your web app URL

    setVideoCallLink(videoCallLink);
  };

  return (
    <View style={styles.container}>
      {videoCallLink ? (
        <WebView
          source={{ uri: videoCallLink }}
          style={{ flex: 1 }}
        />
      ) : (
        <Button title="Start Video Call" onPress={startVideoCall} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VideoCallScreen;
