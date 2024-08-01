import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  switchCamera: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  endCall: () => void;
};

const CallActionBox = ({ switchCamera, toggleMute, toggleCamera, endCall }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={switchCamera} style={styles.button}>
        <Text style={styles.buttonText}>Switch Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleMute} style={styles.button}>
        <Text style={styles.buttonText}>Mute</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleCamera} style={styles.button}>
        <Text style={styles.buttonText}>Toggle Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={endCall} style={styles.button}>
        <Text style={styles.buttonText}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FF6347',
    padding: 10,
  },
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
});

export default CallActionBox;
