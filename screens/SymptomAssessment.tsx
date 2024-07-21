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
} from 'react-native';
import CustomStatusBar from '../components/StatusBar';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { chatWithGemini } from '../api';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import symptomsKeywords from '../components/symptomsKeywords';
import { useFocusEffect } from '@react-navigation/native';

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

  const checkForIrrelevantContent = (message: string): boolean => {
    return !symptomsKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const handleSend = async () => {
    if (symptom.trim()) {
      const userMessage: Message = { user: symptom };
      setMessages([...messages, userMessage]);
      setSymptom('');

      try {
        let botResponse;
        if (checkForIrrelevantContent(symptom)) {
          botResponse = 'I am only equipped to assist with symptom assessment. Please ask about symptoms.';
        } else {
          botResponse = await chatWithGemini(symptom);
          botResponse = botResponse.replace(/\*/g, ''); // Remove '*' characters
        }
        setMessages(prevMessages => [...prevMessages, { user: symptom, bot: botResponse }]);
        setError(null);
      } catch (error) {
        setError('Failed to fetch response from AI. Please check your API key and try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CustomStatusBar screenName={'Symptom Assessment'} />

      <View style={styles.container}>
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            If you have serious symptoms, do not use CampCare. Please contact emergency services immediately.
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.chatRow,
                message.bot ? styles.botRow : styles.userRow,
              ]}
            >
              {message.bot ? (
                <>
                  <View style={styles.thumbnailContainer}>
                    <Image
                      source={require('../assets/Campcare.png')}
                      style={styles.thumbnail}
                    />
                  </View>
                  <View style={styles.messageContainer}>
                    <View style={[styles.chatBubble, styles.botBubble]}>
                      <Text style={styles.nameText}>CampCare</Text>
                      <Text style={styles.chatText}>
                        {message.bot}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.messageContainer}>
                    <View style={[styles.chatBubble, styles.userBubble]}>
                      <Text style={styles.nameText}>You</Text>
                      <Text style={styles.chatText}>{message.user}</Text>
                    </View>
                  </View>
                  <View style={styles.thumbnailContainer}>
                    <View style={styles.userThumbnail}>
                      <Text style={styles.thumbnailText}>
                        {firstName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          ))}
        </ScrollView>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={symptom}
            onChangeText={setSymptom}
            placeholder="Type a symptom"
            placeholderTextColor="#6b6b6b"
          />
          <Pressable style={styles.sendButton} onPress={symptom ? handleSend : () => {}}>
            <MaterialCommunityIcons name="send-circle" size={36} color="#1F75FE" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  warningContainer: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(5),
  },
  warningText: {
    fontSize: responsiveFontSize(4),
    color: '#333',
  },
  chatContainer: {
    flexGrow: 1,
    padding: responsiveWidth(2),
    backgroundColor: '#fff',
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
    color: '#666',
    marginBottom: responsiveHeight(0.5),
    fontWeight: 'bold',
  },
  chatBubble: {
    borderRadius: 10,
    padding: responsiveWidth(3),
  },
  userBubble: {
    backgroundColor: '#e5e5ea',
  },
  botBubble: {
    backgroundColor: '#d1f1ff',
  },
  chatText: {
    fontSize: responsiveFontSize(4),
    color: '#000',
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
    backgroundColor: '#fff',
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
    ...Platform.select({
      web: {
        outlineWidth: 0, // Remove the yellow border on web
      },
    }),
  },
  sendButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});

export default SymptomAssessment;
