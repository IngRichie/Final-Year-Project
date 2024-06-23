import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/StatusBar"; // Adjust the path based on your project structure
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const FitnessNutrition = () => {
  const handlePress = (buttonText: string) => {
    console.log(`Navigating to: ${buttonText}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Fitness & Nutrition" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            Fitness and nutrition are essential for a healthy lifestyle. Regular
            physical activity and a balanced diet improve strength, energy, and
            overall well-being, while reducing the risk of chronic diseases.
          </Text>
        </View>
        <View style={styles.BtnSection}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <View>
            <Pressable
              style={styles.button}
              onPress={() => handlePress("Workout Plans")}
            >
              <FontAwesome name="heartbeat" size={24} color="#01509f" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Workout Plans</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => handlePress("Meal Plans")}
            >
              <FontAwesome name="cutlery" size={24} color="#01509f" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Meal Plans</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => handlePress("Healthy Tips")}
            >
              <FontAwesome name="lightbulb-o" size={24} color="#01509f" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Healthy Tips</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => handlePress("Grocery Lists")}
            >
              <FontAwesome name="shopping-basket" size={24} color="#01509f" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Grocery Lists</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01509f",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  section: {
    backgroundColor: "#01509f",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(5),
  },
  BtnSection: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
    height: "70%",
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
  },
  sectionText: {
    fontSize: responsiveFontSize(4.7),
    color: "#fff",
    marginBottom: responsiveHeight(2),
  },
  button: {
    height: responsiveHeight(7),
    backgroundColor: "#fbfaf3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    borderRadius: 8,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  buttonText: {
    fontSize: responsiveFontSize(4),
    color: "#333",
    flex: 1,
    textAlign: "left",
  },
  buttonIcon: {
    marginRight: responsiveWidth(3),
  },
});

export default FitnessNutrition;
