import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

// Define a RootStackParamList for navigation typings
type RootStackParamList = {
  SymptomAssessment: undefined;
  MedSchedule: undefined;
  CounselorSession: undefined;
  FitnessNutrition: undefined;
  Settings: undefined;
  LoginScreen: undefined;
};

// Define navigation prop type for Menu component
type MenuProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const handleLogOut = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.header}
        locations={[0, 1]}
        colors={["#066fd1", "#004f9e"]}
      >
        <View style={styles.profileContainer}>
          <Ionicons
            name="person-circle-outline"
            size={responsiveFontSize(18)}
            color="#dadada"
            style={styles.profileIcon}
          />
          <Text style={styles.username}>Username</Text>
        </View>
        <Ionicons
          name="moon"
          size={responsiveFontSize(8)}
          color="#fff"
          style={styles.nightModeIcon}
        />
      </LinearGradient>

      <View style={styles.menuItems}>
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? "#f0f0f0" : "transparent" },
          ]}
          onPress={() => navigation.navigate("SymptomAssessment")}
        >
          <Ionicons
            name="pulse-outline"
            size={responsiveFontSize(7)}
            color="#004f9e"
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemText}>Symptom Assessment</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? "#f0f0f0" : "transparent" },
          ]}
          onPress={() => navigation.navigate("MedSchedule")}
        >
          <Ionicons
            name="calendar-outline"
            size={responsiveFontSize(7)}
            color="#004f9e"
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemText}>Medication Schedule</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? "#f0f0f0" : "transparent" },
          ]}
          onPress={() => navigation.navigate("CounselorSession")}
        >
          <Ionicons
            name="people-outline"
            size={responsiveFontSize(7)}
            color="#004f9e"
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemText}>Counselor Session</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? "#f0f0f0" : "transparent" },
          ]}
          onPress={() => navigation.navigate("FitnessNutrition")}
        >
          <Ionicons
            name="fitness-outline"
            size={responsiveFontSize(7)}
            color="#004f9e"
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemText}>Fitness & Nutrition</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? "#f0f0f0" : "transparent" },
          ]}
          onPress={() =>
            Linking.openURL("https://webapps.knust.edu.gh/uhs/appointments/")
          }
        >
          <Ionicons
            name="medkit-outline"
            size={responsiveFontSize(7)}
            color="#004f9e"
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemText}>Clinic Appointment</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? "#f0f0f0" : "transparent" },
          ]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons
            name="settings-outline"
            size={responsiveFontSize(7)}
            color="#004f9e"
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemText}>Settings</Text>
        </Pressable>
      </View>

      <View style={styles.bottomItems}>
        <View style={styles.divider} />
        <Pressable style={styles.logoutButton} onPress={handleLogOut}>
          <Ionicons
            name="log-out-outline"
            size={responsiveFontSize(7)}
            color="#004f9e"
            style={styles.menuIcon}
          />
          <Text style={styles.menuItemText}>Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: responsiveWidth(5),
    backgroundColor: "#004f9e",
    height: responsiveHeight(25),
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: 'center',
    // height: '80%',
    // backgroundColor: 'red'
  },
  profileIcon: {
    marginRight: responsiveWidth(2.5),
    fontSize: responsiveFontSize(35),
    color: 'white',

  },
  username: {
    fontSize: responsiveFontSize(4.5),
    color: "#fff",
  },
  nightModeIcon: {
    alignSelf: "flex-start",
    fontSize: responsiveFontSize(5.5),
  },
  menuItems: {
    marginTop: responsiveHeight(2.5),
    paddingHorizontal: responsiveWidth(5),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveHeight(1.25),
  },
  menuIcon: {
    marginRight: responsiveWidth(3.75),
  },
  menuItemText: {
    fontSize: responsiveFontSize(4.5),
    color: "#333",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: responsiveHeight(1.25),
  },
  bottomItems: {
    marginTop: "auto",
    paddingHorizontal: responsiveWidth(5),
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveHeight(1.25),
  },
});

export default Menu;