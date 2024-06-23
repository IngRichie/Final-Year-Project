import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/StatusBar"; // Adjust the path based on your project structure
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const MedSchedule = () => {
  const handlePress = (buttonText: any) => {
    // Replace with your navigation logic
    console.log(`Navigating to: ${buttonText}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Med Schedule" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            A med reminder is a tool that sends alerts to remind you when it's
            time to take your medications, ensuring you stay on schedule for
            better health outcomes.
          </Text>
        </View>
        <View style={styles.BtnSection}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <Pressable
            style={styles.button}
            onPress={() => handlePress("Medication List")}
          >
            <FontAwesome name="list" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Medication List</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handlePress("Add/Edit Medication")}
          >
            <FontAwesome name="edit" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Add/Edit Medication</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handlePress("Schedule Overview")}
          >
            <FontAwesome name="calendar" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Schedule Overview</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handlePress("Reminders & Notifications")}
          >
            <FontAwesome name="bell" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Reminders & Notifications</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handlePress("Medication Logging")}
          >
            <FontAwesome name="book" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Medication Logging</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  section: {
    backgroundColor: "#fff",
    height: "30%",
    // paddingHorizontal: responsiveWidth(5),
    // paddingVertical: responsiveHeight(5),
  },
  BtnSection: {
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    height: "70%",
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
    color: "#3a3a3a",
  },
  sectionText: {
    fontSize: responsiveFontSize(4.7),
    color: "#fff",
    backgroundColor: "blue",
    height: "100%",
    lineHeight: responsiveHeight(5),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    height: responsiveHeight(7),
    backgroundColor: "#fbfaf3",
    justifyContent: "flex-start", // Align items to the start (left)
    paddingLeft: responsiveWidth(5), // Add padding to the left
    marginBottom: responsiveHeight(2),
    borderRadius: 8,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: responsiveFontSize(4),
    marginLeft: responsiveWidth(2),
    color: "#3a3a3a",
  },
  buttonIcon: {
    marginRight: responsiveWidth(2),
  },
});

export default MedSchedule;
