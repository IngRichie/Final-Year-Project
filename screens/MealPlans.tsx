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
import StatusBar from "../components/StatusBar";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const MealPlans = () => {
  const handlePress = (buttonText: string) => {
    // Replace with your navigation logic
    console.log(`Navigating to: ${buttonText}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Meal Plans" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            Meal planning is essential for a balanced diet, ensuring you receive the right nutrients and maintain a healthy lifestyle. Here you'll find various resources to help you create effective meal plans.
          </Text>
        </View>
        <View style={styles.BtnSection}>
          <Text style={styles.sectionTitle}>Meal Plans Resources</Text>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Daily Meal Plan")}>
            <FontAwesome5 name="calendar-alt" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Daily Meal Plan</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Recipe Library")}>
            <MaterialCommunityIcons name="book-open" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Recipe Library</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Custom Meal Plans")}>
            <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Custom Meal Plans</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Nutritional Information")}>
            <FontAwesome5 name="info-circle" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Nutritional Information</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F75FE",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  section: {
    backgroundColor: "#1F75FE",
    height: responsiveHeight(30),
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(5),
  },
  BtnSection: {
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    minHeight: responsiveHeight(57),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
    color: "#3a3a3a",
  },
  sectionText: {
    fontSize: responsiveFontSize(4),
    color: "#fff",
    lineHeight: responsiveHeight(5),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    height: responsiveHeight(7),
    backgroundColor: "#fbfaf3",
    justifyContent: "flex-start",
    paddingLeft: responsiveWidth(5),
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

export default MealPlans;
