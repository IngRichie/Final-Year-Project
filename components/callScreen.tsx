import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
  MediaStreamTrack,
} from "react-native-webrtc";
import { db } from "../firebaseConfig";
import { doc, updateDoc, onSnapshot, deleteField, addDoc, collection, setDoc } from "firebase/firestore";
import CallActionBox from "../components/callActionBox";

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

type Props = {
  roomId: string;
  screens: { ROOM: "JOIN_ROOM"; CALL: "CALL"; JOIN: "JOIN" };
  setScreen: (screen: "JOIN_ROOM" | "CALL" | "JOIN") => void;
};

export default function CallScreen({ roomId, screens, setScreen }: Props) {
  const [localStream, setLocalStream] = useState<MediaStream | undefined>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>();
  const [cachedLocalPC, setCachedLocalPC] = useState<RTCPeerConnection | undefined>();

  const [isMuted, setIsMuted] = useState(false);
  const [isOffCam, setIsOffCam] = useState(false);

  useEffect(() => {
    startLocalStream();
  }, []);

  useEffect(() => {
    if (localStream && roomId) {
      startCall(roomId);
    }
  }, [localStream, roomId]);

  const endCall = async () => {
    if (cachedLocalPC) {
      const senders = cachedLocalPC.getSenders();
      senders.forEach((sender) => {
        cachedLocalPC.removeTrack(sender);
      });
      cachedLocalPC.close();
    }

    const roomRef = doc(db, "room", roomId);
    await updateDoc(roomRef, { answer: deleteField() });

    setLocalStream(undefined);
    setRemoteStream(undefined);
    setCachedLocalPC(undefined);
    setScreen(screens.ROOM);
  };

  const startLocalStream = async () => {
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();
    const facing = isFront ? "front" : "environment";
    const videoSourceId = devices.find(
      (device: { kind: string; facing: string; }) => device.kind === "videoinput" && device.facing === facing
    );
    const facingMode = isFront ? "user" : "environment";
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500,
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const startCall = async (id: string) => {
    const localPC = new RTCPeerConnection(configuration);
    localStream?.getTracks().forEach((track) => {
      localPC.addTrack(track, localStream);
    });

    const roomRef = doc(db, "room", id);
    const callerCandidatesCollection = collection(roomRef, "callerCandidates");
    const calleeCandidatesCollection = collection(roomRef, "calleeCandidates");

    localPC.addEventListener("icecandidate", (e: { candidate: { toJSON: () => any; }; }) => {
      if (!e.candidate) {
        return;
      }
      addDoc(callerCandidatesCollection, e.candidate.toJSON());
    });

    localPC.ontrack = (e: { streams: { getTracks: () => any[]; }[]; }) => {
      const newStream = new MediaStream();
      e.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
        newStream.addTrack(track);
      });
      setRemoteStream(newStream);
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    await setDoc(roomRef, { offer, connected: false }, { merge: true });

    onSnapshot(roomRef, (doc) => {
      const data = doc.data();
      if (data?.answer && !localPC.setRemoteDescription) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        localPC.setRemoteDescription(rtcSessionDescription);
      } else {
        setRemoteStream(undefined);
      }
    });

    onSnapshot(calleeCandidatesCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream?.getVideoTracks().forEach((track) => track._switchCamera());
  };

  const toggleMute = () => {
    if (!remoteStream) return;

    localStream?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  const toggleCamera = () => {
    localStream?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsOffCam(!isOffCam);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FF6347' }}>
      {!remoteStream && (
        <RTCView
          style={{ flex: 1 }}
          streamURL={localStream?.toURL()}
          objectFit="cover"
        />
      )}

      {remoteStream && (
        <>
          <RTCView
            style={{ flex: 1 }}
            streamURL={remoteStream?.toURL()}
            objectFit="cover"
          />
          {!isOffCam && (
            <RTCView
              style={{ width: 128, height: 192, position: 'absolute', right: 24, top: 32 }}
              streamURL={localStream?.toURL()}
            />
          )}
        </>
      )}
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <CallActionBox
          switchCamera={switchCamera}
          toggleMute={toggleMute}
          toggleCamera={toggleCamera}
          endCall={endCall}
        />
      </View>
    </View>
  );
}
