import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import CustomStatusBar from '../components/StatusBar';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { useDarkMode } from '../components/DarkModeContext';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

interface Message {
  user: string;
  bot?: string;
}

const SymptomAssessment: React.FC = () => {
  const [symptom, setSymptom] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const { isDarkModeEnabled } = useDarkMode();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
          const userSnapshot = await getDocs(userQuery);
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            if (userData && userData.firstname) {
              setFirstName(userData.firstname);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Cleanup on screen focus change
      };
    }, [])
  );

  const handleSend = async () => {
    if (symptom.trim()) {
      const userMessage: Message = { user: symptom };
      setMessages([...messages, userMessage]);
      setSymptom('');

      try {
        const options = {
          method: 'POST',
          url: 'https://your-google-gemini-api-endpoint',
          headers: {
            'Authorization': `Bearer your_google_gemini_api_key`,
            'Content-Type': 'application/json',
          },
          data: {
            prompt: `Symptom: ${symptom}`,
          },
        };

        const response = await axios.request(options);
        const botResponse = response.data?.output?.text || 'No relevant information found.';

        setMessages((prevMessages: any) => [...prevMessages, { user: symptom, bot: botResponse }]);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch response from API. Please check your API key and try again.');
      }
    }
  };

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.safeAreaView}>
      <CustomStatusBar screenName={'Symptom Assessment'} />

      <KeyboardAvoidingView style={dynamicStyles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={dynamicStyles.warningContainer}>
          <Text style={dynamicStyles.warningText}>
            If you have serious symptoms, do not use CampCare. Please contact emergency services immediately.
          </Text>
        </View>
        <ScrollView contentContainerStyle={dynamicStyles.chatContainer}>
          {messages.map((message: Message, index: number) => (
            <View
              key={index}
              style={[
                dynamicStyles.chatRow,
                message.bot ? dynamicStyles.botRow : dynamicStyles.userRow,
              ]}
            >
              {message.bot ? (
                <>
                  <View style={dynamicStyles.thumbnailContainer}>
                    <Image
                      source={require('../assets/Campcare.png')}
                      style={dynamicStyles.thumbnail}
                    />
                  </View>
                  <View style={dynamicStyles.messageContainer}>
                    <View style={[dynamicStyles.chatBubble, dynamicStyles.botBubble]}>
                      <Text style={dynamicStyles.nameText}>CampCare</Text>
                      <Text style={dynamicStyles.chatText}>
                        {message.bot}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={dynamicStyles.messageContainer}>
                    <View style={[dynamicStyles.chatBubble, dynamicStyles.userBubble]}>
                      <Text style={dynamicStyles.nameText}>You</Text>
                      <Text style={dynamicStyles.chatText}>{message.user}</Text>
                    </View>
                  </View>
                  <View style={dynamicStyles.thumbnailContainer}>
                    <View style={dynamicStyles.userThumbnail}>
                      <Text style={dynamicStyles.thumbnailText}>
                        {firstName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          ))}
        </ScrollView>
        {error && <Text style={dynamicStyles.errorText}>{error}</Text>}
        <View style={dynamicStyles.inputContainer}>
          <TextInput
            style={dynamicStyles.textInput}
            value={symptom}
            onChangeText={setSymptom}
            placeholder="Type a symptom"
            placeholderTextColor={isDarkModeEnabled ? "#aaa" : "#6b6b6b"}
          />
          <Pressable style={dynamicStyles.sendButton} onPress={symptom ? handleSend : () => {}}>
            <MaterialCommunityIcons name="send-circle" size={responsiveFontSize(10)} color={isDarkModeEnabled ? "#fff" : "#1F75FE"} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? "#1E1E1E" : "#fff",
  },
  container: {
    flex: 1,
  },
  warningContainer: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: isDarkModeEnabled ? "#333" : "#fff",
  },
  warningText: {
    fontSize: responsiveFontSize(4),
    color: isDarkModeEnabled ? "#fff" : '#333',
  },
  chatContainer: {
    flexGrow: 1,
    padding: responsiveWidth(2),
    backgroundColor: isDarkModeEnabled ? "#1E1E1E" : "#fff",
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: responsiveHeight(1),
  },
  userRow: {
    alignSelf: 'flex-end',
  },
  botRow: {
    alignSelf: 'flex-start',
  },
  thumbnailContainer: {
    marginHorizontal: responsiveWidth(2),
  },
  userThumbnail: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#318CE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#e5e5ea',
  },
  thumbnailText: {
    color: '#fff',
    fontSize: responsiveFontSize(6),
  },
  messageContainer: {
    flexDirection: 'column',
    maxWidth: '70%',
    marginBottom: responsiveHeight(2.5),
  },
  nameText: {
    fontSize: responsiveFontSize(3),
    color: isDarkModeEnabled ? "#ccc" : '#666',
    marginBottom: responsiveHeight(0.5),
    fontWeight: 'bold',
  },
  chatBubble: {
    borderRadius: 10,
    padding: responsiveWidth(3),
  },
  userBubble: {
    backgroundColor: isDarkModeEnabled ? "#555" : '#e5e5ea',
  },
  botBubble: {
    backgroundColor: isDarkModeEnabled ? "#444" : '#d1f1ff',
  },
  chatText: {
    fontSize: responsiveFontSize(4),
    color: isDarkModeEnabled ? "#fff" : '#000',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: responsiveHeight(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
    backgroundColor: isDarkModeEnabled ? "#1E1E1E" : '#fff',
    marginBottom: responsiveHeight(2),
  },
  textInput: {
    flex: 1,
    height: responsiveHeight(6),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveFontSize(4),
    marginRight: responsiveWidth(2),
    color: isDarkModeEnabled ? "#ccc" : '#000',
    ...Platform.select({
      web: {
        outlineWidth: 0,
      },
    }),
  },
  sendButton: {
    borderRadius: 20,
  },
});

export default SymptomAssessment;
