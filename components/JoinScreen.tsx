import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  roomId: string;
  setScreen: (screen: "JOIN_ROOM" | "CALL" | "JOIN") => void;
};

const JoinScreen = ({ roomId, setScreen }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Joining Room ID: {roomId}</Text>
      <Button title="Start Call" onPress={() => setScreen("CALL")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default JoinScreen;
