import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MediaStream, RTCPeerConnection, mediaDevices } from 'react-native-webrtc';

interface VideoChatButtonsProps {
  createOffer: () => void;
  createAnswer: () => void;
  endCall: () => void;
  localStream: MediaStream | null;
  setLocalStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
  peerConnection: React.MutableRefObject<RTCPeerConnection>;
}

const VideoChatButtons: React.FC<VideoChatButtonsProps> = ({
  createOffer,
  createAnswer,
  endCall,
  localStream,
  setLocalStream,
  peerConnection,
}) => {

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
  };

  const flipCamera = async () => {
    if (!localStream) return;

    const videoTrack = localStream.getVideoTracks()[0];
    const currentSettings = videoTrack.getSettings() as MediaTrackSettings;
    const newFacingMode = currentSettings.facingMode === 'user' ? 'environment' : 'user';

    const newStream = await mediaDevices.getUserMedia({
      video: { facingMode: newFacingMode as MediaTrackConstraints['facingMode'] },
      audio: true,
    });

    const newVideoTrack = newStream.getVideoTracks()[0];

    localStream.removeTrack(videoTrack);
    localStream.addTrack(newVideoTrack);
    setLocalStream(localStream);

    const sender = peerConnection.current.getSenders().find(s => s.track?.kind === 'video');
    if (sender) {
      sender.replaceTrack(newVideoTrack);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={createOffer}>
        <Icon name="call-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={createAnswer}>
        <Icon name="call-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>Answer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={endCall}>
        <Icon name="call-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>End</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={toggleMute}>
        <Icon name="mic-off-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>Mute</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={flipCamera}>
        <Icon name="camera-reverse-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>Flip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    padding: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginTop: 5,
  },
});

export default VideoChatButtons;
