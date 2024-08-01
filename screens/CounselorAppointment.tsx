import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = [
    '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM',
    '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
    '5:30 PM', '6:00 PM'
  ];

  const onDateChange = (event: Event, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const onConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      // Process the booking here
      alert(`Appointment booked for ${selectedDate.toDateString()} at ${selectedTime}`);
    } else {
      alert('Please select a date and time slot.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Preferred Appointment Date</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={onDateChange}
        />
      )}

      <Text style={styles.header}>Select Time Slot</Text>

      <Picker
        selectedValue={selectedTime}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedTime(itemValue)}
      >
        <Picker.Item label="Select a time slot" value={null} />
        {timeSlots.map((time, index) => (
          <Picker.Item key={index} label={time} value={time} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.confirmButton} onPress={onConfirmBooking}>
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#318CE7',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  datePickerButton: {
    backgroundColor: '#dcecfc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#dcecfc',
    borderRadius: 5,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#ffad33',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AppointmentScheduler;
