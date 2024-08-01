import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useDarkMode } from '../components/DarkModeContext';

const { width } = Dimensions.get('window');
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const moodIcons = ['😡', '😟', '😐', '🙂', '😄'];
const moodOptions = [
  'Work', 'Exercise', 'Family', 'Hobbies', 'Finances', 'Sleep',
  'Drink', 'Food', 'Relationships', 'Education', 'Weather', 'Music',
  'Travel', 'Health'
];

const MoodLogger: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  const { isDarkModeEnabled } = useDarkMode();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const toggleOption = (option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, 'moodLogger', user.uid, 'logs'), {
          mood: selectedMood,
          options: selectedOptions,
          description,
          timestamp: serverTimestamp(),
        });
        Alert.alert('Success', 'Mood logged successfully');
        setSelectedMood(null);
        setSelectedOptions([]);
        setDescription('');
      } else {
        Alert.alert('Error', 'User not authenticated');
      }
    } catch (error) {
      console.error('Error logging mood:', error);
      Alert.alert('Error', 'Failed to log mood');
    }
  };

  const handleBookAppointment = () => {
    navigation.navigate('CounselorSession');
  };

  const handleViewLogHistory = () => {
    navigation.navigate('MoodHistory');
  };

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView contentContainerStyle={dynamicStyles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={dynamicStyles.backButton}>
          <Icon name="arrow-back" size={responsiveFontSize(6)} color={isDarkModeEnabled ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={dynamicStyles.header}>How are you feeling?</Text>
        <View style={dynamicStyles.moodContainer}>
          {moodIcons.map((icon, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedMood(index)}>
              <View style={[dynamicStyles.moodIconContainer, selectedMood === index && dynamicStyles.selectedMoodIconContainer]}>
                <Text style={dynamicStyles.moodIcon}>{icon}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={dynamicStyles.subHeader}>What's affecting your mood?</Text>
        <View style={dynamicStyles.optionsContainer}>
          {moodOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                dynamicStyles.optionButton,
                selectedOptions.includes(option) && dynamicStyles.selectedOptionButton,
              ]}
              onPress={() => toggleOption(option)}
            >
              <Text style={dynamicStyles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={dynamicStyles.subHeader}>Let's write about it</Text>
        <TextInput
          style={dynamicStyles.textInput}
          placeholder="How is your day going? How has it affected your mood? Or anything else..."
          placeholderTextColor={isDarkModeEnabled ? '#ccc' : '#888'}
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TouchableOpacity style={dynamicStyles.submitButton} onPress={handleSubmit}>
          <Text style={dynamicStyles.submitButtonText}>Log mood</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={dynamicStyles.viewLogButton} onPress={handleViewLogHistory}>
          <Text style={dynamicStyles.viewLogButtonText}>View Mood Log History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.bookButton} onPress={handleBookAppointment}>
          <Text style={dynamicStyles.bookButtonText}>Book Counselor's Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? '#121212' : '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginTop: 20,
  },
  header: {
    fontSize: responsiveFontSize(6),
    fontWeight: 'bold',
    marginTop: 20,
    color: isDarkModeEnabled ? '#fff' : '#000',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  moodIconContainer: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 50,
    padding: 10,
  },
  selectedMoodIconContainer: {
    borderColor: '#318CE7',
  },
  moodIcon: {
    fontSize: responsiveFontSize(8),
  },
  subHeader: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    marginVertical: 10,
    color: isDarkModeEnabled ? '#fff' : '#000',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: isDarkModeEnabled ? '#fff' : '#000',
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#318CE7',
  },
  optionText: {
    color: isDarkModeEnabled ? '#fff' : '#000',
  },
  textInput: {
    height: 100,
    borderColor: isDarkModeEnabled ? '#666' : '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: isDarkModeEnabled ? '#fff' : '#000',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#318CE7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(5),
  },
  bookButton: {
    borderColor: '#318CE7',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  bookButtonText: {
    color: '#318CE7',
    fontSize: responsiveFontSize(5),
  },
  viewLogButton: {
    backgroundColor: '#1F75FE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  viewLogButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(5),
  },
});

export default MoodLogger;
