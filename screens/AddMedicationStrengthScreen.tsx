import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { RootStackParamList } from '../types';

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type AddMedicationStrengthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddMedicationStrengthScreen'
>;

type AddMedicationStrengthScreenRouteProp = RouteProp<RootStackParamList, 'AddMedicationStrengthScreen'>;

type Props = {
  navigation: AddMedicationStrengthScreenNavigationProp;
  route: AddMedicationStrengthScreenRouteProp;
};

const AddMedicationStrengthScreen = ({ navigation, route }: Props) => {
  const { medicationName, medicationType } = route.params;
  const [strength, setStrength] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [loadedMedicationName, setLoadedMedicationName] = useState('');

  useEffect(() => {
    const loadMedicationName = async () => {
      try {
        const fileUri = FileSystem.documentDirectory + 'medicationNames.txt';
        const fileContents = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        setLoadedMedicationName(fileContents);
      } catch (error) {
        console.error('Error loading medication name from file:', error);
      }
    };

    loadMedicationName();
  }, []);

  const handleNext = async () => {
    if (strength.trim() !== '' && selectedUnit.trim() !== '') {
      try {
        const fileUri = FileSystem.documentDirectory + 'medicationNames.txt';
        const data = `${loadedMedicationName},${strength},${selectedUnit}`;
        await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
        navigation.navigate('AddMedicationTimeScreen', { medicationName, medicationType, strength, selectedUnit });
      } catch (error) {
        console.error('Error saving medication strength and unit to file:', error);
      }
    }
  };

  const units = ['mg', 'mcg', 'g', 'ml', '%'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#007aff" />
            </TouchableOpacity>
            <HeaderText>{loadedMedicationName || medicationName}</HeaderText>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="cancel" size={24} color="#007aff" />
            </TouchableOpacity>
          </Header>
          <Image source={require('../assets/medicine.png')} style={styles.icon} />
          <Title>Add the Medication Strength</Title>
          <Subtitle>{medicationType}</Subtitle>
          <Note>Strength indicates the amount of drug per dosage form (e.g., 500 mg/tablet). Potency refers to the relative strength needed to achieve the same effect; a drug requiring the least amount is the most potent.</Note>
          <Input
            placeholder="Add Strength"
            value={strength}
            onChangeText={setStrength}
          />
          <SectionTitle>Choose Unit</SectionTitle>
          {units.map((unit) => (
            <FormItem key={unit} onPress={() => setSelectedUnit(unit)}>
              <FormText selected={unit === selectedUnit}>{unit}</FormText>
            </FormItem>
          ))}
          <NextButton onPress={handleNext} disabled={strength.trim() === '' || selectedUnit.trim() === ''}>
            <NextButtonText disabled={strength.trim() === '' || selectedUnit.trim() === ''}>Next</NextButtonText>
          </NextButton>
          <SkipButton onPress={() => navigation.navigate('AddMedicationTimeScreen', { medicationName, medicationType, strength: '', selectedUnit: '' })}>
            <SkipButtonText>Skip</SkipButtonText>
          </SkipButton>
        </KeyboardAvoidingView>
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
    padding: responsiveWidth(5),
  },
  icon: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
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

const Note = styled.Text`
  font-size: ${responsiveFontSize(3.5)}px;
  color: #666;
  margin-bottom: ${responsiveHeight(2)}px;
  text-align: center;
  padding: ${responsiveWidth(3)}px;
`;

const SectionTitle = styled.Text`
  font-size: ${responsiveFontSize(4.5)}px;
  font-weight: bold;
  margin-top: ${responsiveHeight(3)}px;
  margin-bottom: ${responsiveHeight(1.5)}px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  width: 80%;
  padding: ${responsiveHeight(2)}px;
  border-radius: 10px;
  margin-bottom: ${responsiveHeight(2)}px;
  font-size: ${responsiveFontSize(4)}px;
  align-self: center;
`;

const FormItem = styled.TouchableOpacity`
  padding: ${responsiveHeight(2)}px;
  background-color: #f2f2f2;
  margin-bottom: ${responsiveHeight(1.5)}px;
  border-radius: 10px;
  width: 80%;
  align-self: center;
`;

const FormText = styled.Text<{ selected: boolean }>`
  font-size: ${responsiveFontSize(4)}px;
  color: ${({ selected }) => (selected ? '#007aff' : '#000')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  text-align: center;
`;

const NextButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007aff')};
  padding: ${responsiveHeight(2)}px;
  border-radius: 10px;
  align-items: center;
  width: 80%;
  align-self: center;
  margin-top: ${responsiveHeight(2)}px;
`;

const NextButtonText = styled.Text<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? '#888' : '#fff')};
  font-size: ${responsiveFontSize(4)}px;
`;

const SkipButton = styled.TouchableOpacity`
  align-items: center;
  width: 80%;
  align-self: center;
  margin-top: ${responsiveHeight(2)}px;
`;

const SkipButtonText = styled.Text`
  color: #007aff;
  font-size: ${responsiveFontSize(4)}px;
`;

export default AddMedicationStrengthScreen;
