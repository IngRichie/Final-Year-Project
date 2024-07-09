import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Dimensions, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const PreferencesScreen = ({ }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = React.useState(false);

  const toggleNotificationsSwitch = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleLocationSwitch = () => setIsLocationEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Preferences" />
     
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.preferenceItem}>
          <Text style={styles.label}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={isNotificationsEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleNotificationsSwitch}
            value={isNotificationsEnabled}
          />
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.label}>Enable Location Services</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={isLocationEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleLocationSwitch}
            value={isLocationEnabled}
          />
        </View>
        {/* Add more preference settings as needed */}
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
  preferenceItem: {
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

export default PreferencesScreen;
