import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const VideoChatButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Icon name="sunny-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>Effects</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="mic-off-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>Mute</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="camera-reverse-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>Flip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.endButton]}>
        <Icon name="call-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>End</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    padding: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginTop: 5,
  },
  endButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 50,
    padding: 10,
  },
});

export default VideoChatButtons;
