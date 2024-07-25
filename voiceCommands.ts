import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { createClient } from '@deepgram/sdk';
import type { NavigationProp } from '@react-navigation/native';

let navigation: NavigationProp<any> | null = null;

export const initVoiceCommands = (nav: NavigationProp<any>) => {
  navigation = nav;
};

const speak = (text: string) => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  } else {
    const Speech = require('expo-speech');
    Speech.speak(text);
  }
};

export const useVoiceCommands = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);
  const [transcript, setTranscript] = useState('');
  const recordingRef = useRef<Audio.Recording | null>(null);
  const deepgramApiKey = 'YOUR_DEEPGRAM_API_KEY';
  const deepgram = createClient(deepgramApiKey);

  useEffect(() => {
    const getPermission = async () => {
      const { granted } = await Audio.requestPermissionsAsync();
      setAudioPermission(granted);
    };

    getPermission();
  }, []);

  const startRecording = async () => {
    if (isRecording) return;
    setIsRecording(true);
    setTranscript('');

    const recording = new Audio.Recording();
    recordingRef.current = recording;

    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecordingStatus('recording');
    } catch (error) {
      console.error('Failed to start recording', error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;
    setIsRecording(false);

    try {
      const recording = recordingRef.current;
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        if (uri) {
          transcribeAudio(uri);
        }
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const transcribeAudio = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const audioBlob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const buffer = Buffer.from(arrayBuffer);

        const response = await deepgram.transcription.preRecorded(
          { buffer, mimetype: 'audio/wav' },
          { model: 'nova', punctuate: true, language: 'en-US' }
        );

        const result = response.results.channels[0].alternatives[0].transcript;
        console.log('Transcribed text:', result); // Print transcribed text for testing
        setTranscript(result);
        handleCommand(result);
      };

      reader.readAsArrayBuffer(audioBlob);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  };

  const handleCommand = (command: string) => {
    console.log(`Recognized command: ${command}`);
    speak(`You said: ${command}`);
    switch (command.toLowerCase()) {
      case 'take me to the book appointment page':
      case 'i want to book an appointment':
      case 'go to appointment booking':
        if (navigation) navigation.navigate('BookAppointment');
        break;
      case 'show me the counselor details':
      case 'go to counselor details page':
      case 'i want to see counselor information':
        if (navigation) navigation.navigate('CounselorDetails');
        break;
      case 'take me to the counselor session page':
      case 'i want to join a counselor session':
      case 'go to counselor session':
        if (navigation) navigation.navigate('CounselorSession');
        break;
      case 'show me the daily tips':
      case 'go to daily tips page':
      case 'i want to see daily health tips':
        if (navigation) navigation.navigate('DailyTips');
        break;
      case 'show me fitness and nutrition tips':
      case 'go to fitness and nutrition page':
      case 'i want to see fitness and nutrition advice':
        if (navigation) navigation.navigate('FitnessNutrition');
        break;
      default:
        speak("I didn't recognize that command. Please try again.");
    }
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
    recordingStatus,
    transcript,
  };
};
