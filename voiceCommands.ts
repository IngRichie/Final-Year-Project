import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';

let navigation: NavigationProp<any>;

export const initVoiceCommands = (nav: NavigationProp<any>) => {
  navigation = nav;
};

const speak = (text: string) => {
  if (Platform.OS === 'web') {
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
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<any[]>([]);

  useEffect(() => {
    async function getPermission() {
      if (Platform.OS === 'web') {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          setAudioPermission(true);
        } catch (error) {
          console.error("Permission Denied: " + error.message);
          setAudioPermission(false);
        }
      } else {
        const permission = await Audio.requestPermissionsAsync();
        console.log("Permission Granted: " + permission.granted);
        setAudioPermission(permission.granted);
      }
    }

    getPermission();
    return () => {
      if (recording) {
        stopRecording();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleRecordButtonPress = async (firstName: string) => {
    setRecordedAudio(null);
    setRecording(null);
    if (recording) {
      await stopRecording();
    } else {
      await startRecording(firstName);
    }
  };

  const startRecording = async (firstName: string) => {
    setIsRecording(true);
    setRecording(null);
    setRecordedAudio(null);

    if (isRecording) {
      console.warn("A recording is already in progress");
      return;
    }

    if (!audioPermission) {
      console.warn("Audio permission is not granted");
      return;
    }

    try {
      if (Platform.OS === 'web') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = event => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/m4a' });
          const uri = URL.createObjectURL(blob);
          setRecordedAudio({ uri, name: `recording-${Date.now()}.m4a`, type: "audio/m4a" });
          const command = await processAudio(uri);
          handleCommand(command);
        };

        mediaRecorder.start();
        console.log("Starting Recording");

      } else {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const newRecording = new Audio.Recording();
        console.log("Starting Recording");

        await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        await newRecording.startAsync();
        setRecording(newRecording);
      }

      setRecordingStatus("recording");

      // Introduce and greet the user
      const greetingMessage = `Hello, ${firstName}. How may I assist you today?`;
      console.log(greetingMessage); // Debugging line
      speak(greetingMessage);

      // Set a timeout to stop recording after 5 seconds
      timeoutRef.current = setTimeout(async () => {
        if (recording || mediaRecorderRef.current) {
          await stopRecording();
          speak("I didn't hear you clearly. Here are some things I can help you with: Booking appointments, viewing counselor details, joining a counselor session, viewing daily tips, fitness and nutrition advice, and more. Please try again.");
        }
      }, 5000);

    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    try {
      if (recordingStatus === "recording") {
        console.log("Stopping Recording");
        if (Platform.OS === 'web' && mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
        } else if (recording) {
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();
          setRecordedAudio({ uri, name: `recording-${Date.now()}.m4a`, type: "audio/m4a" });
          const command = await processAudio(uri);
          handleCommand(command);
        }
        setRecording(null);
        setRecordingStatus("stopped");
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const processAudio = async (uri: string): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("audio", {
        uri,
        name: `recording-${Date.now()}.m4a`,
        type: "audio/m4a",
      });

      const response = await axios.post('https://api.assemblyai.com/v2/transcript', formData, {
        headers: {
          "Authorization": "Bearer bbc677d7b8894c8badd6f29ed50707c8",
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.text;
    } catch (error) {
      console.log('Error processing audio:', error);
      if (error.response && error.response.status === 401) {
        speak("Authorization error. Please check your API key.");
      }
      return '';
    }
  };

  const handleCommand = (command: string) => {
    console.log(`Recognized command: ${command}`);
    speak(`You said: ${command}`);
    switch (command.toLowerCase()) {
      case 'take me to the book appointment page':
      case 'i want to book an appointment':
      case 'go to appointment booking':
        navigation.navigate('BookAppointment');
        break;
      case 'show me the counselor details':
      case 'go to counselor details page':
      case 'i want to see counselor information':
        navigation.navigate('CounselorDetails');
        break;
      case 'take me to the counselor session page':
      case 'i want to join a counselor session':
      case 'go to counselor session':
        navigation.navigate('CounselorSession');
        break;
      case 'show me the daily tips':
      case 'go to daily tips page':
      case 'i want to see daily health tips':
        navigation.navigate('DailyTips');
        break;
      case 'show me fitness and nutrition tips':
      case 'go to fitness and nutrition page':
      case 'i want to see fitness and nutrition advice':
        navigation.navigate('FitnessNutrition');
        break;
      case 'i forgot my password':
      case 'go to forget password page':
      case 'take me to password reset':
        navigation.navigate('ForgetPassword');
        break;
      case 'show me healthy tips':
      case 'go to healthy tips page':
      case 'i want to see health advice':
        navigation.navigate('HealthyTips');
        break;
      case 'take me to the homepage':
      case 'go to the main page':
      case 'i want to go home':
        navigation.navigate('Homepage');
        break;
      case 'take me to the login page':
      case 'i want to log in':
      case 'go to login screen':
        navigation.navigate('LoginScreen');
        break;
      case 'show me my medication schedule':
      case 'go to med schedule page':
      case 'i want to see my meds schedule':
        navigation.navigate('MedSchedule');
        break;
      case 'take me to mental health page':
      case 'show me mental health tips':
      case 'go to mental health section':
        navigation.navigate('MentalHealth');
        break;
      case 'show me the news':
      case 'go to the news page':
      case 'i want to see health news':
        navigation.navigate('NewsPage');
        break;
      case 'show me my notifications':
      case 'go to notification screen':
      case 'i want to see my alerts':
        navigation.navigate('NotificationScreen');
        break;
      case 'take me to notification settings':
      case 'go to notification settings page':
      case 'i want to manage my notifications':
        navigation.navigate('NotificationSettings');
        break;
      case 'take me to preferences':
      case 'go to preferences page':
      case 'i want to set my preferences':
        navigation.navigate('PreferencesScreen');
        break;
      case 'show me the privacy settings':
      case 'go to privacy screen':
      case 'i want to see privacy options':
        navigation.navigate('PrivacyScreen');
        break;
      case 'take me to my profile':
      case 'go to profile page':
      case 'i want to see my profile':
        navigation.navigate('ProfileScreen');
        break;
      case 'take me to settings':
      case 'go to the settings page':
      case 'i want to change settings':
        navigation.navigate('Settings');
        break;
      case 'take me to sign up':
      case 'go to the sign up page':
      case 'i want to create an account':
        navigation.navigate('SignUpScreen');
        break;
      case 'take me to symptom assessment':
      case 'go to symptom assessment page':
      case 'i want to assess my symptoms':
        navigation.navigate('SymptomAssessment');
        break;
      case 'is a counselor available for booking?':
      case 'can i book a counselor now?':
      case 'check if a counselor is available':
        // Implement your logic to check counselor availability
        break;
      case 'what are the latest health tips today?':
      case 'tell me today\'s health tips':
      case 'show me the latest health advice':
        // Implement your logic to read the latest health tip
        break;
      case 'what do i have on my notifications?':
      case 'read my notifications':
      case 'tell me my latest alerts':
        // Implement your logic to read notifications
        break;
      default:
        speak("I didn't recognize that command. Here are some things I can help you with: Booking appointments, viewing counselor details, joining a counselor session, viewing daily tips, fitness and nutrition advice, and more. Please try again.");
    }
  };

  return {
    handleRecordButtonPress,
    isRecording,
    recordingStatus,
    recordedAudio,
  };
};
