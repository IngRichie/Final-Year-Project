import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '../components/DarkModeContext';

interface TimeSlotPickerProps {
  timeSlots?: string[]; // Made timeSlots optional with a default value
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  title: string;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ timeSlots = [], selectedTime, onSelectTime, title }) => {
  const { isDarkModeEnabled } = useDarkMode();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isDarkModeEnabled && styles.darkTitle]}>{title}</Text>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.selectedTimeSlot,
              isDarkModeEnabled && styles.darkTimeSlot,
            ]}
            onPress={() => onSelectTime(time)}
          >
            <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#318CE7',
    marginBottom: 10,
  },
  darkTitle: {
    color: '#fff',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timeSlot: {
    backgroundColor: '#fff',
    borderColor: '#318CE7',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  darkTimeSlot: {
    backgroundColor: '#444',
    borderColor: '#fff',
  },
  selectedTimeSlot: {
    backgroundColor: '#318CE7',
  },
  timeText: {
    color: '#318CE7',
  },
  selectedTimeText: {
    color: '#fff',
  },
});

export default TimeSlotPicker;
