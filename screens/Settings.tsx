import * as React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/StatusBar"; // Adjust the path based on your project structure
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Settings = () => {
  const handlePress = (buttonText: string) => {
    console.log(`Navigating to: ${buttonText}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Settings" />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => handlePress("Profile")}>
          <FontAwesome name="user" size={24} color="#01509f" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Profile</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress("Privacy & Security")}>
          <FontAwesome name="lock" size={24} color="#01509f" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Privacy & Security</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress("Notification")}>
          <FontAwesome name="bell" size={24} color="#01509f" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Notification</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress("Accessibility")}>
          <FontAwesome name="universal-access" size={24} color="#01509f" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Accessibility</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress("Preferences")}>
          <FontAwesome name="sliders" size={24} color="#01509f" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Preferences</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#004d9b",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  leftArrowIcon: {
    width: 30,
    height: 30,
  },
  screenName: {
    marginLeft: 15,
    fontSize: responsiveFontSize(6),
    color: "#fff",
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: responsiveHeight(5),
    alignItems: "center",
  },
  button: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    backgroundColor: "#fbfaf3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: responsiveFontSize(5),
    color: "#3a3a3a",
    marginLeft: 15,
  },
  buttonIcon: {
    marginRight: responsiveWidth(3),
  },
});

export default Settings;
