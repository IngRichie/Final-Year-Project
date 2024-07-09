import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Dimensions, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const NotificationSettingsScreen = ({ navigation }) => {
  const [emailNotifications, setEmailNotifications] = React.useState(false);
  const [pushNotifications, setPushNotifications] = React.useState(false);
  const [smsNotifications, setSmsNotifications] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Notification Settings" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.label}>Email Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={emailNotifications ? "#fff" : "#f4f3f4"}
            onValueChange={() => setEmailNotifications(previousState => !previousState)}
            value={emailNotifications}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.label}>Push Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={pushNotifications ? "#fff" : "#f4f3f4"}
            onValueChange={() => setPushNotifications(previousState => !previousState)}
            value={pushNotifications}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.label}>SMS Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={smsNotifications ? "#fff" : "#f4f3f4"}
            onValueChange={() => setSmsNotifications(previousState => !previousState)}
            value={smsNotifications}
          />
        </View>
        {/* Add more notification settings as needed */}
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
  settingItem: {
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

export default NotificationSettingsScreen;
