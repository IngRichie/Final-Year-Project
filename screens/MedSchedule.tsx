import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListRenderItem } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, doc, deleteDoc, DocumentData, QuerySnapshot } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type MedicationReminderScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MedicationReminderScreen'
>;

type Props = {
  navigation: MedicationReminderScreenNavigationProp;
};

type Medication = {
  id: string;
  medicationName: string;
  selectedForm: string;
  selectedUnit: string;
  frequency: string;
  times: string[];
  timestamp: any;
};

const MedicationReminderScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const date = new Date();
    setCurrentMonth(date.toLocaleString('default', { month: 'long' }));
    setCurrentYear(date.getFullYear().toString());

    // Fetch medications
    const medQuery = query(collection(db, 'medReminder'));
    const unsubscribe = onSnapshot(medQuery, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const medsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Medication[];
      setMedications(medsData);
      console.log('Medications fetched: ', medsData);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const confirmDeleteMedication = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this medication?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteMedication(id),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteMedication = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'medReminder', id));
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };

  const handleAddMedication = () => {
    navigation.navigate('AddMedication');
  };

  const renderDateItem: ListRenderItem<Date> = ({ item }) => (
    <DateItem onPress={() => setSelectedDate(item.getDate())} selected={item.getDate() === selectedDate}>
      <DayText selected={item.getDate() === selectedDate}>{item.toLocaleString('default', { weekday: 'short' })}</DayText>
      <DateText selected={item.getDate() === selectedDate}>{item.getDate()}</DateText>
    </DateItem>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' size={responsiveFontSize(6)} color='#fff' />
          </TouchableOpacity>
          <MonthText>{`${currentMonth} ${currentYear}`}</MonthText>
          <Icon name='notifications-none' size={responsiveFontSize(6)} color='#fff' />
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
          {medications.length === 0 ? (
            <NoMedicationsText>You have no medication list.</NoMedicationsText>
          ) : (
            <ScrollView>
              {medications.map((med) => (
                <MedicationItem key={med.id}>
                  <MedicationInfo>
                    <MedicationName>{med.medicationName}</MedicationName>
                    <MedicationDosage>{`${med.selectedForm} ${med.selectedUnit}`}</MedicationDosage>
                    <MedTimeText>{med.times ? med.times.join(', ') : 'No time set'}</MedTimeText>
                    <MedicationFrequency>{med.frequency ? med.frequency : 'No frequency set'}</MedicationFrequency>
                  </MedicationInfo>
                  <TouchableOpacity onPress={() => confirmDeleteMedication(med.id)}>
                    <Icon name='delete' size={responsiveFontSize(6)} color='#2e2e2d' />
                  </TouchableOpacity>
                </MedicationItem>
              ))}
            </ScrollView>
          )}
        </MedicationsContainer>
        <AddButton onPress={handleAddMedication}>
          <Icon name='add' size={responsiveFontSize(7.5)} color='#fff' />
        </AddButton>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #318ce7;
`;

const Header = styled.View`
  background-color: #318ce7;
  padding: ${responsiveWidth(5)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MonthText = styled.Text`
  color: #fff;
  font-size: ${responsiveFontSize(4.5)}px;
  text-align: center;
  flex: 1;
`;

const DateScrollerContainer = styled.View`
  background-color: #318ce7;
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
  color: ${({ selected }) => (selected ? '#318ce7' : '#fff')};
  font-weight: bold;
`;

const DateText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? '#318ce7' : '#fff')};
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
  color: #318ce7;
  font-size: ${responsiveFontSize(4.5)}px;
  margin-bottom: ${responsiveHeight(2.5)}px;
`;

const NoMedicationsText = styled.Text`
  color: #000;
  font-size: ${responsiveFontSize(4)}px;
  text-align: center;
  margin-top: ${responsiveHeight(2.5)}px;
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

const MedTimeText = styled.Text`
  color: #318ce7;
  font-size: ${responsiveFontSize(3.5)}px;
  margin-top: ${responsiveHeight(1.25)}px;
`;

const MedicationFrequency = styled.Text`
  color: #318ce7;
  font-size: ${responsiveFontSize(3.5)}px;
  margin-top: ${responsiveHeight(1.25)}px;
`;

const AddButton = styled.TouchableOpacity`
  position: absolute;
  right: ${responsiveWidth(5)}px;
  bottom: ${responsiveHeight(5)}px;
  background-color: #318ce7;
  width: ${responsiveWidth(15)}px;
  height: ${responsiveWidth(15)}px;
  border-radius: ${responsiveWidth(7.5)}px;
  justify-content: center;
  align-items: center;
  elevation: 5;
`;

export default MedicationReminderScreen;
