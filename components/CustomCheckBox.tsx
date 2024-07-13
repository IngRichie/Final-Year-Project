import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomCheckBox = ({ value, onValueChange, label }) => {
  return (
    <Pressable style={styles.container} onPress={() => onValueChange(!value)}>
      <View style={[styles.checkbox, value && styles.checkedCheckbox]}>
        {value && <FontAwesome name="check" size={16} color="#fff" />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#318CE7',
    borderColor: '#318CE7',
  },
  label: {
    fontSize: 16,
    color: '#717171',
  },
});

export default CustomCheckBox;
