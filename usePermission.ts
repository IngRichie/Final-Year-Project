import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const usePermission = () => {
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [microphonePermissionGranted, setMicrophonePermissionGranted] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const cameraStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const microphoneStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      setCameraPermissionGranted(cameraStatus === PermissionsAndroid.RESULTS.GRANTED);
      setMicrophonePermissionGranted(microphoneStatus === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      const cameraStatus = await check(PERMISSIONS.IOS.CAMERA);
      if (cameraStatus !== RESULTS.GRANTED) {
        const requestCamera = await request(PERMISSIONS.IOS.CAMERA);
        setCameraPermissionGranted(requestCamera === RESULTS.GRANTED);
      } else {
        setCameraPermissionGranted(true);
      }

      const microphoneStatus = await check(PERMISSIONS.IOS.MICROPHONE);
      if (microphoneStatus !== RESULTS.GRANTED) {
        const requestMicrophone = await request(PERMISSIONS.IOS.MICROPHONE);
        setMicrophonePermissionGranted(requestMicrophone === RESULTS.GRANTED);
      } else {
        setMicrophonePermissionGranted(true);
      }
    }
  };

  return {
    cameraPermissionGranted,
    microphonePermissionGranted,
    requestCameraPermission: requestPermissions,
    requestMicrophonePermission: requestPermissions,
  };
};
