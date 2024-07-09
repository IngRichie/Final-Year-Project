import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import CustomStatusBar from "../components/StatusBar"; // Adjust the import path as needed
import { FontAwesome } from '@expo/vector-icons'; // Ensure you have expo-vector-icons installed

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const SymptomAssessment = () => {
  const [symptom, setSymptom] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (symptom.trim()) {
      setMessages([...messages, symptom]);
      setSymptom("");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CustomStatusBar screenName={"Symptom Assessment"} />

      <View style={styles.container}>
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            If you have serious symptoms, do not use CampCare. Please contact emergency services immediately.
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {messages.map((message, index) => (
            <View key={index} style={styles.chatBubble}>
              <Text style={styles.chatText}>{message}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={symptom}
            onChangeText={setSymptom}
            placeholder="Type a symptom"
            placeholderTextColor="#6b6b6b"
          />
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <FontAwesome name="send" size={24} color="#1F75FE" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#1F75FE",
  },
  container: {
    flex: 1,
  },
  warningContainer: {
    backgroundColor: "#1F75FE",
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
  },
  warningText: {
    fontSize: responsiveFontSize(4),
    color: "#fff",
  },
  chatContainer: {
    flexGrow: 1,
    padding: responsiveWidth(5),
    backgroundColor: "#fff",
  },
  chatBubble: {
    backgroundColor: "#e5e5ea",
    borderRadius: 20,
    padding: responsiveWidth(4),
    marginVertical: responsiveHeight(1),
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  chatText: {
    fontSize: responsiveFontSize(4),
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  textInput: {
    flex: 1,
    height: responsiveHeight(6),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveFontSize(4),
    marginRight: responsiveWidth(2),
  },
  sendButton: {
    backgroundColor: "#fff",
    padding: responsiveWidth(2),
    borderRadius: 20,
  },
});

export default SymptomAssessment;
