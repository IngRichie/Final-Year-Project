import * as React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar"; // Adjust the path based on your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Settings = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handlePress = (buttonText: string) => {
    // Map button text to screen component
    const screenComponents: { [key: string]: React.ComponentType } = {
      Profile: require("./ProfileScreen").default, // Adjust path as needed
      Privacy: require("./PrivacyScreen").default, // Adjust path as needed
      Notification: require("./NotificationScreen").default, // Adjust path as needed
      Accessibility: require("./AccessibilityScreen").default, // Adjust path as needed
      Preferences: require("./PreferencesScreen").default, // Adjust path as needed
    };

    // Navigate using the mapped screen component
    navigation.navigate(buttonText, {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Settings" />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => handlePress("ProfileScreen")}>
          <FontAwesome name="user" size={24} color="#1F75FE" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Profile</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress("PrivacyScreen")}>
          <FontAwesome name="lock" size={24} color="#1F75FE" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Privacy</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress("NotificationSettings")}>
          <FontAwesome name="bell" size={24} color="#1F75FE" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Notification</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress("AccessibilityScreen")}>
          <FontAwesome name="universal-access" size={24} color="#1F75FE" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Accessibility</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress("PreferencesScreen")}>
          <FontAwesome name="sliders" size={24} color="#1F75FE" style={styles.buttonIcon} />
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
