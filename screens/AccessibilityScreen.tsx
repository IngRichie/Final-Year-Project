import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Dimensions, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const AccessibilityScreen = ({ navigation }) => {
  const [isVoiceOverEnabled, setIsVoiceOverEnabled] = React.useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);

  const toggleVoiceOverSwitch = () => setIsVoiceOverEnabled(previousState => !previousState);
  const toggleDarkModeSwitch = () => setIsDarkModeEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Accessibility" />
    
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.accessibilityItem}>
          <Text style={styles.label}>Enable Voice Over</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={isVoiceOverEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleVoiceOverSwitch}
            value={isVoiceOverEnabled}
          />
        </View>
        <View style={styles.accessibilityItem}>
          <Text style={styles.label}>Enable Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={isDarkModeEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleDarkModeSwitch}
            value={isDarkModeEnabled}
          />
        </View>
        {/* Add more accessibility settings as needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveWidth(5),
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: responsiveWidth(3),
  },
  headerTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    color: "#1F75FE",
  },
  scrollContainer: {
    padding: responsiveWidth(5),
  },
  accessibilityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: responsiveHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(204, 204, 204, 0.3)",
  },
  label: {
    fontSize: responsiveFontSize(4.5),
    color: "#000",
  },
});

export default AccessibilityScreen;
