import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { RootStackParamList } from '../types';

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type ChooseMedicationTypeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChooseMedicationTypeScreen'
>;

type ChooseMedicationTypeScreenRouteProp = RouteProp<RootStackParamList, 'ChooseMedicationTypeScreen'>;

type Props = {
  navigation: ChooseMedicationTypeScreenNavigationProp;
  route: ChooseMedicationTypeScreenRouteProp;
};

const ChooseMedicationTypeScreen = ({ navigation, route }: Props) => {
  const { medicationName: initialMedicationName } = route.params;
  const [medicationName, setMedicationName] = useState(initialMedicationName);
  const [selectedForm, setSelectedForm] = useState('');

  useEffect(() => {
    const loadMedicationName = async () => {
      try {
        const fileUri = FileSystem.documentDirectory + 'medicationNames.txt';
        const fileContents = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        setMedicationName(fileContents);
      } catch (error) {
        console.error('Error loading medication name from file:', error);
      }
    };

    loadMedicationName();
  }, []);

  const handleNext = async () => {
    if (selectedForm.trim() !== '') {
      try {
        const fileUri = FileSystem.documentDirectory + 'selectedMedicationType.txt';
        const medicationType = `${medicationName},${selectedForm}`;
        await FileSystem.writeAsStringAsync(fileUri, medicationType, { encoding: FileSystem.EncodingType.UTF8 });
        navigation.navigate('AddMedicationStrengthScreen', { medicationName, medicationType: selectedForm });
      } catch (error) {
        console.error('Error saving selected medication type to file:', error);
      }
    }
  };

  const forms = {
    common: ['Capsule', 'Tablet', 'Liquid', 'Topical'],
    more: [
      'Cream', 'Device', 'Drops', 
      'Foam', 'Gel', 'Inhaler', 'Injection', 'Lotion', 'Ointment', 'Patch', 
      'Powder', 'Spray', 'Suppository'
    ],
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <HeaderText>Back</HeaderText>
        </TouchableOpacity>
        <HeaderText>{medicationName}</HeaderText>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <HeaderText>Cancel</HeaderText>
        </TouchableOpacity>
      </Header>
      <Image source={require('../assets/medicine.png')} style={styles.icon} />
      <Title>Choose the Medication Type</Title>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SectionTitle>Common Forms</SectionTitle>
        {forms.common.map((form) => (
          <FormItem key={form} onPress={() => setSelectedForm(form)}>
            <FormText selected={form === selectedForm}>{form}</FormText>
          </FormItem>
        ))}
        <SectionTitle>More Forms</SectionTitle>
        {forms.more.map((form) => (
          <FormItem key={form} onPress={() => setSelectedForm(form)}>
            <FormText selected={form === selectedForm}>{form}</FormText>
          </FormItem>
        ))}
      </ScrollView>
      <NextButton onPress={handleNext} disabled={selectedForm.trim() === ''}>
        <NextButtonText disabled={selectedForm.trim() === ''}>Next</NextButtonText>
      </NextButton>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: responsiveHeight(10), // Add bottom margin to ScrollView
    paddingHorizontal: responsiveWidth(5),
  },
  icon: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
  },
});

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: ${responsiveWidth(5)}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${responsiveHeight(2)}px;
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

const SectionTitle = styled.Text`
  font-size: ${responsiveFontSize(4.5)}px;
  font-weight: bold;
  margin-top: ${responsiveHeight(3)}px;
  margin-bottom: ${responsiveHeight(1.5)}px;
`;

const FormItem = styled.TouchableOpacity`
  padding: ${responsiveHeight(2)}px;
  background-color: #f2f2f2;
  margin-bottom: ${responsiveHeight(1.5)}px;
  border-radius: 10px;
`;

const FormText = styled.Text<{ selected: boolean }>`
  font-size: ${responsiveFontSize(4)}px;
  color: ${({ selected }) => (selected ? '#007aff' : '#000')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`;

const NextButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007aff')};
  padding: ${responsiveHeight(2)}px;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: ${responsiveHeight(2)}px;
  left: ${responsiveWidth(5)}px;
`;

const NextButtonText = styled.Text<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? '#888' : '#fff')};
  font-size: ${responsiveFontSize(4)}px;
`;

export default ChooseMedicationTypeScreen;
