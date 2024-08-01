import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useDarkMode } from '../components/DarkModeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const MoodLogHistory: React.FC = () => {
  const [moodLogs, setMoodLogs] = useState<any[]>([]);
  const { isDarkModeEnabled } = useDarkMode();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchMoodLogs = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'moodLogger', user.uid, 'logs'));
        const querySnapshot = await getDocs(q);
        const logs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMoodLogs(logs);
      }
    };

    fetchMoodLogs();
  }, []);

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  const renderMoodLog = ({ item }: { item: any }) => (
    <View style={dynamicStyles.logContainer}>
      <Text style={dynamicStyles.logText}>Mood: {item.mood}</Text>
      <Text style={dynamicStyles.logText}>Options: {item.options.join(', ')}</Text>
      <Text style={dynamicStyles.logText}>Description: {item.description}</Text>
      <Text style={dynamicStyles.logText}>Timestamp: {new Date(item.timestamp.seconds * 1000).toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={dynamicStyles.backButton}>
        <Icon name="arrow-back" size={responsiveFontSize(6)} color={isDarkModeEnabled ? '#fff' : '#000'} />
      </TouchableOpacity>
      <Text style={dynamicStyles.header}>Mood Log History</Text>
      <FlatList
        data={moodLogs}
        renderItem={renderMoodLog}
        keyExtractor={(item) => item.id}
        contentContainerStyle={dynamicStyles.contentContainer}
      />
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? '#121212' : '#fff',
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20,
  },
  header: {
    fontSize: responsiveFontSize(6),
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    color: isDarkModeEnabled ? '#fff' : '#000',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logContainer: {
    backgroundColor: isDarkModeEnabled ? '#1E1E1E' : '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  logText: {
    color: isDarkModeEnabled ? '#fff' : '#000',
    fontSize: responsiveFontSize(4),
  },
});

export default MoodLogHistory;
