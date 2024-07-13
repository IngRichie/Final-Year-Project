import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

interface AddMedicationScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const AddMedicationScreen: React.FC<AddMedicationScreenProps> = ({ navigation }) => {
  const [medicationName, setMedicationName] = useState('');

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleNext = async () => {
    if (medicationName.trim() !== '') {
      const fileUri = FileSystem.documentDirectory + 'medicationNames.txt';
      try {
        const fileExists = await FileSystem.getInfoAsync(fileUri);
        if (!fileExists.exists) {
          await FileSystem.writeAsStringAsync(fileUri, medicationName, { encoding: FileSystem.EncodingType.UTF8 });
        }
        navigation.navigate('ChooseMedicationType', { medicationName });
      } catch (error) {
        console.error('Error saving medication name to file:', error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Container>
          <CancelButton onPress={handleCancel}>
            <CancelButtonText>Cancel</CancelButtonText>
          </CancelButton>
          <Image source={require('../assets/medicine.png')} style={styles.icon} />
          <Title>Medication Name</Title>
          <Input
            placeholder="Add Medication Name"
            value={medicationName}
            onChangeText={setMedicationName}
          />
          <NextButton onPress={handleNext} disabled={medicationName.trim() === ''}>
            <NextButtonText disabled={medicationName.trim() === ''}>Next</NextButtonText>
          </NextButton>
        </Container>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  padding-top: 60px; /* Add some padding at the top */
`;

const CancelButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 20px;
`;

const CancelButtonText = styled.Text`
  color: #007aff;
  font-size: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const NextButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007aff')};
  padding: 15px 20px;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 40px;
`;

const NextButtonText = styled.Text<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? '#888' : '#fff')};
  font-size: 16px;
`;

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default AddMedicationScreen;
