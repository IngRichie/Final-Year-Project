import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions, Platform, Modal, TextInput } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type RootStackParamList = {
  AddMedicationTimeScreen: { medicationName: string; medicationType: string };
  MedSchedule: undefined; // Ensure this matches your navigation type definitions
};

type AddMedicationTimeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddMedicationTimeScreen'
>;

type AddMedicationTimeScreenRouteProp = RouteProp<RootStackParamList, 'AddMedicationTimeScreen'>;

type Props = {
  navigation: AddMedicationTimeScreenNavigationProp;
  route: AddMedicationTimeScreenRouteProp;
};

const frequencies = ['Every Day', 'Every Week', 'Every Month', 'Other'];

const AddMedicationTimeScreen = ({ navigation, route }: Props) => {
  const { medicationType } = route.params;
  const [medicationName, setMedicationName] = useState('');
  const [frequency, setFrequency] = useState('Every Day');
  const [customFrequency, setCustomFrequency] = useState('');
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [times, setTimes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMedicationName = async () => {
      const fileUri = FileSystem.documentDirectory + 'medicationNames.txt';
      try {
        const fileContents = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        setMedicationName(fileContents);
      } catch (error) {
        console.error('Error loading medication name from file:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicationName();
  }, []);

  const handleTimeChange = (event: { type: string; }, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);

    if (event.type === 'set') {
      setTimes([...times, currentTime.toLocaleTimeString()]);
    }
  };

  const handleDone = async () => {
    const finalFrequency = customFrequency.trim() !== '' ? customFrequency : frequency;
    try {
      const fileUri = FileSystem.documentDirectory + 'medicationDetails.txt';
      const medicationDetails = JSON.stringify({ medicationName, medicationType, frequency: finalFrequency, times });
      await FileSystem.writeAsStringAsync(fileUri, medicationDetails, { encoding: FileSystem.EncodingType.UTF8 });
      navigation.navigate('MedSchedule'); // Navigate to MedSchedule screen
    } catch (error) {
      console.error('Error saving medication details to file:', error);
    }
  };

  const selectFrequency = (selectedFrequency: string) => {
    if (selectedFrequency === 'Other') {
      setFrequency(selectedFrequency);
      setShowFrequencyModal(true);
    } else {
      setFrequency(selectedFrequency);
      setCustomFrequency('');
      setShowFrequencyModal(false);
    }
  };

  const removeTime = (index: number) => {
    setTimes(times.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#007aff" />
          </TouchableOpacity>
          <HeaderText>{isLoading ? 'Loading...' : medicationName}</HeaderText>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="cancel" size={24} color="#007aff" />
          </TouchableOpacity>
        </Header>
        <Title>When will you take this?</Title>
        <Subtitle>{medicationType}</Subtitle>

        <Section>
          <SectionTitle>Frequency</SectionTitle>
          <FrequencyButton onPress={() => setShowFrequencyModal(true)}>
            <FrequencyText>{customFrequency.trim() !== '' ? customFrequency : frequency}</FrequencyText>
          </FrequencyButton>
        </Section>

        <Section>
          <SectionTitle>Time of Day</SectionTitle>
          {times.map((time, index) => (
            <TimeContainer key={index}>
              <TimeText>{time}</TimeText>
              <RemoveTimeButton onPress={() => removeTime(index)}>
                <Icon name="delete" size={20} color="#ff0000" />
              </RemoveTimeButton>
            </TimeContainer>
          ))}
          <AddTimeButton onPress={() => setShowTimePicker(true)}>
            <Icon name="add" size={20} color="#007aff" />
            <AddTimeText>Add a time</AddTimeText>
          </AddTimeButton>
        </Section>

        {showTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <DoneButton onPress={handleDone} disabled={times.length === 0}>
          <DoneButtonText disabled={times.length === 0}>Done</DoneButtonText>
        </DoneButton>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showFrequencyModal}
          onRequestClose={() => setShowFrequencyModal(false)}
        >
          <ModalContainer>
            <ModalContent>
              {frequencies.map((freq) => (
                <FrequencyOption key={freq} onPress={() => selectFrequency(freq)}>
                  <FrequencyOptionText>{freq}</FrequencyOptionText>
                </FrequencyOption>
              ))}
              {frequency === 'Other' && (
                <TextInput
                  style={styles.input}
                  placeholder="Enter custom frequency"
                  value={customFrequency}
                  onChangeText={setCustomFrequency}
                />
              )}
              <CloseButton onPress={() => setShowFrequencyModal(false)}>
                <CloseButtonText>Close</CloseButtonText>
              </CloseButton>
            </ModalContent>
          </ModalContainer>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(5),
  },
  icon: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: '100%',
  },
});

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${responsiveHeight(2)}px;
  padding-horizontal: ${responsiveWidth(5)}px;
`;

const HeaderText = styled.Text`
  color: #007aff;
  font-size: ${responsiveFontSize(4)}px;
`;

const Title = styled.Text`
  font-size: ${responsiveFontSize(5)}px;
  font-weight: bold;
  margin-bottom: ${responsiveHeight(2)}px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: ${responsiveFontSize(4)}px;
  color: #666;
  margin-bottom: ${responsiveHeight(2)}px;
  text-align: center;
`;

const Section = styled.View`
  margin-bottom: ${responsiveHeight(3)}px;
`;

const SectionTitle = styled.Text`
  font-size: ${responsiveFontSize(4.5)}px;
  font-weight: bold;
  margin-bottom: ${responsiveHeight(1)}px;
`;

const FrequencyButton = styled.TouchableOpacity`
  background-color: #f2f2f2;
  padding: ${responsiveHeight(2)}px;
  border-radius: 10px;
  margin-bottom: ${responsiveHeight(2)}px;
  align-items: center;
`;

const FrequencyText = styled.Text`
  font-size: ${responsiveFontSize(4)}px;
  color: #007aff;
`;

const TimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${responsiveHeight(1)}px;
`;

const TimeText = styled.Text`
  font-size: ${responsiveFontSize(4)}px;
  color: #666;
`;

const RemoveTimeButton = styled.TouchableOpacity`
  padding: ${responsiveHeight(1)}px;
`;

const AddTimeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #f2f2f2;
  padding: ${responsiveHeight(2)}px;
  border-radius: 10px;
  margin-bottom: ${responsiveHeight(2)}px;
`;

const AddTimeText = styled.Text`
  font-size: ${responsiveFontSize(4)}px;
  color: #007aff;
  margin-left: ${responsiveWidth(2)}px;
`;

const DoneButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007aff')};
  padding: ${responsiveHeight(2)}px;
  border-radius: 10px;
  align-items: center;
  width: 80%;
  align-self: center;
  margin-top: ${responsiveHeight(2)}px;
`;

const DoneButtonText = styled.Text<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? '#888' : '#fff')};
  font-size: ${responsiveFontSize(4)}px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
 	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
	width: 80%;
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	align-items: center;
`;

const FrequencyOption = styled.TouchableOpacity`
	padding: 10px 0;
`;

const FrequencyOptionText = styled.Text`
	font-size: ${responsiveFontSize(4)}px;
	color: #007aff;
`;

const CloseButton = styled.TouchableOpacity`
	margin-top: 20px;
	padding: 10px 20px;
	background-color: #007aff;
	border-radius: 10px;
`;

const CloseButtonText = styled.Text`
	color: #fff;
	font-size: ${responsiveFontSize(4)}px;
`;

export default AddMedicationTimeScreen;
