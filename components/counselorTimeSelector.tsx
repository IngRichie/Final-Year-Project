// src/components/TimeSlotSelector.tsx
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

interface TimeSlotSelectorProps {
  availableTimes: string[];
  onSelectTime: (time: string) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ availableTimes, onSelectTime }) => {
  return (
    <FlatList
      data={availableTimes}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelectTime(item)}>
          <View>
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default TimeSlotSelector;
