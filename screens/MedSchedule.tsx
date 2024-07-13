import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; // Adjust the import path as needed

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

interface Medication {
  name: string;
  dosage: string;
  time: string;
}

type MedicationReminderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MedicationReminderScreen'>;

interface Props {
  navigation: MedicationReminderScreenNavigationProp;
}

const MedicationReminderScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const date = new Date();
    setCurrentMonth(date.toLocaleString('default', { month: 'long' }));
    setCurrentYear(date.getFullYear().toString());
  }, []);

  useEffect(() => {
    const loadMedications = async () => {
      const fileUri = FileSystem.documentDirectory + 'medications.txt';
      try {
        const fileContents = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        const meds: Medication[] = JSON.parse(fileContents);
        setMedications(meds);
      } catch (error) {
        console.error('Error loading medications from file:', error);
      }
    };

    loadMedications();
  }, []);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleAddMedication = () => {
    navigation.navigate('AddMedication');
  };

  const renderDateItem: ListRenderItem<Date> = ({ item }) => (
    <DateItem onPress={() => setSelectedDate(item.getDate())} selected={item.getDate() === selectedDate}>
      <DayText selected={item.getDate() === selectedDate}>
        {item.toLocaleString('default', { weekday: 'short' })}
      </DayText>
      <DateText selected={item.getDate() === selectedDate}>{item.getDate()}</DateText>
    </DateItem>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <MonthText>{`${currentMonth} ${currentYear}`}</MonthText>
          <Icon name="notifications-none" size={responsiveFontSize(6)} color="#fff" />
        </Header>
        <DateScrollerContainer>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: responsiveWidth(2.5) }}
            data={dates}
            keyExtractor={(item) => item.toString()}
            renderItem={renderDateItem}
            showsHorizontalScrollIndicator={false}
          />
        </DateScrollerContainer>
        <MedicationsContainer>
          <Title>To Take</Title>
          <ScrollView>
            {medications.map((med, index) => (
              <MedicationItem key={index}>
                <MedicationInfo>
                  <MedicationName>{med.name}</MedicationName>
                  <MedicationDosage>{med.dosage}</MedicationDosage>
                  <MedicationTime>{med.time}</MedicationTime>
                </MedicationInfo>
                <Icon name="notifications-none" size={responsiveFontSize(6)} color="#6c63ff" />
              </MedicationItem>
            ))}
          </ScrollView>
        </MedicationsContainer>
        <AddButton onPress={handleAddMedication}>
          <Icon name="add" size={responsiveFontSize(7.5)} color="#fff" />
        </AddButton>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f8f8f8;
`;

const Header = styled.View`
  background-color: #6c63ff;
  padding: ${responsiveWidth(5)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MonthText = styled.Text`
  color: #fff;
  font-size: ${responsiveFontSize(4.5)}px;
`;

const DateScrollerContainer = styled.View`
  background-color: #6c63ff;
  padding-bottom: ${responsiveHeight(2.5)}px;
`;

const DateItem = styled.TouchableOpacity<{ selected: boolean }>`
  align-items: center;
  margin: 0 ${responsiveWidth(2.5)}px;
  background-color: ${({ selected }) => (selected ? '#fff' : 'transparent')};
  padding: ${responsiveHeight(1.25)}px ${responsiveWidth(2.5)}px;
  border-radius: 10px;
`;

const DayText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? '#6c63ff' : '#fff')};
  font-weight: bold;
`;

const DateText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? '#6c63ff' : '#fff')};
  font-size: ${responsiveFontSize(4.5)}px;
  margin-top: ${responsiveHeight(1.25)}px;
`;

const MedicationsContainer = styled.View`
  flex: 1;
  background-color: #fff;
  margin-top: ${responsiveHeight(2.5)}px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: ${responsiveWidth(5)}px;
`;

const Title = styled.Text`
  color: #6c63ff;
  font-size: ${responsiveFontSize(4.5)}px;
  margin-bottom: ${responsiveHeight(2.5)}px;
`;

const MedicationItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: ${responsiveHeight(3.75)}px;
  border-radius: 10px;
  margin-bottom: ${responsiveHeight(2.5)}px;
`;

const MedicationInfo = styled.View``;

const MedicationName = styled.Text`
  color: #000;
  font-size: ${responsiveFontSize(4)}px;
  font-weight: bold;
`;

const MedicationDosage = styled.Text`
  color: #000;
  font-size: ${responsiveFontSize(3.5)}px;
  margin-top: ${responsiveHeight(1.25)}px;
`;

const MedicationTime = styled.Text`
  color: #6c63ff;
  font-size: ${responsiveFontSize(3.5)}px;
  margin-top: ${responsiveHeight(1.25)}px;
`;

const AddButton = styled.TouchableOpacity`
  position: absolute;
  right: ${responsiveWidth(5)}px;
  bottom: ${responsiveHeight(5)}px;
  background-color: #6c63ff;
  width: ${responsiveWidth(15)}px;
  height: ${responsiveWidth(15)}px;
  border-radius: ${responsiveWidth(7.5)}px;
  justify-content: center;
  align-items: center;
  elevation: 5;
`;

export default MedicationReminderScreen;
