import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RTCView, mediaDevices } from 'react-native-webrtc';
import VideoChatButtons from '../components/videoChatButtons';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};

const VideoChatScreen = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection>(new RTCPeerConnection(configuration));
  const signalingChannel = useRef<WebSocket | null>(null); // Replace with your signaling implementation

  useEffect(() => {
    getUserMedia();
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (peerConnection.current) {
      peerConnection.current.addEventListener('icecandidate', handleICECandidateEvent);
      peerConnection.current.addEventListener('track', handleTrackEvent);
    }
  }, [peerConnection.current]);

  const getUserMedia = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: 'user' as MediaTrackConstraints['facingMode']
        }
      });
      setLocalStream(stream);
      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate && signalingChannel.current) {
      signalingChannel.current.send(JSON.stringify({ 'ice': event.candidate }));
    }
  };

  const handleTrackEvent = (event: RTCTrackEvent) => {
    setRemoteStream(event.streams[0]);
  };

  const handleRemoteICECandidate = (iceCandidate: RTCIceCandidateInit) => {
    const candidate = new RTCIceCandidate(iceCandidate);
    peerConnection.current.addIceCandidate(candidate).catch(e => console.error(e));
  };

  const handleRemoteOffer = async (offer: RTCSessionDescriptionInit) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    if (signalingChannel.current) {
      signalingChannel.current.send(JSON.stringify({ 'sdp': peerConnection.current.localDescription }));
    }
  };

  const handleRemoteAnswer = async (answer: RTCSessionDescriptionInit) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const createOffer = async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    if (signalingChannel.current) {
      signalingChannel.current.send(JSON.stringify({ 'sdp': peerConnection.current.localDescription }));
    }
  };

  const createAnswer = async () => {
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    if (signalingChannel.current) {
      signalingChannel.current.send(JSON.stringify({ 'sdp': peerConnection.current.localDescription }));
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      peerConnection.current.close();
    }
    setLocalStream(null);
    setRemoteStream(null);
    console.log('Call ended');
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.localVideo}
          />
        )}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
          />
        )}
      </View>
      <VideoChatButtons
        createOffer={createOffer}
        createAnswer={createAnswer}
        endCall={endCall}
        localStream={localStream}
        setLocalStream={setLocalStream}
        peerConnection={peerConnection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideo: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
  },
});

export default VideoChatScreen;
