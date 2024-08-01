import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appointment } from '../types';

const ConfirmationScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const appointment = route.params?.appointment as Appointment;

  const handleBackToHome = () => {
    navigation.navigate('AppointmentBooking');
  };

  return (
    <View>
      <Text>Your appointment is confirmed:</Text>
      <Text>Date: {appointment.date}</Text>
      <Text>Time: {appointment.time}</Text>
      <Text>Reason: {appointment.reason}</Text>
      <Button title="Back to Home" onPress={handleBackToHome} />
    </View>
  );
};

export default ConfirmationScreen;
